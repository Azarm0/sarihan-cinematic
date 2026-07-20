# Turns generated footage into a web-ready hero loop + poster frame.
#
# Run with no arguments once assets\hero-source.mp4 exists. See VIDEO-PROMPT.md
# for how to generate that file and what to do if the loop seam shows.

param(
    [string]$Source   = "$PSScriptRoot\assets\hero-source.mp4",
    # Play forward then reversed. Start and end frames become identical by
    # construction, so the seam cannot show on any footage. Motion visibly
    # reverses, which is invisible on steam/water and obvious on anything that
    # falls or pours - see VIDEO-PROMPT.md.
    [switch]$PingPong,
    # Trim window, in frames. Generated clips usually open on a static beat.
    [int]   $StartFrame = 0,
    [int]   $Length     = 0,          # 0 = to the end
    # Paints out a generator watermark, e.g. -Delogo '1128,556,72,72'.
    # Works cleanly when the mark sits over flat texture.
    [string]$Delogo   = '',
    # 28-30 is right for video sitting behind a scrim, where banding is
    # invisible and bytes are not. Drop toward 23 if you see blocking.
    [int]   $Crf      = 28,
    [int]   $Width    = 1600
)

$ErrorActionPreference = 'Stop'

$candidates = @(
    'C:\Users\Hussam\AppData\Local\Programs\Stremio\ffmpeg.exe',
    'ffmpeg'
)
$ffmpeg = $candidates | Where-Object { $_ -eq 'ffmpeg' -or (Test-Path $_) } | Select-Object -First 1
if (-not $ffmpeg) { throw "No ffmpeg found." }
if (-not (Test-Path $Source)) {
    throw "Source video not found: $Source`nGenerate it first - see VIDEO-PROMPT.md."
}

$out = Join-Path $PSScriptRoot 'assets'
New-Item -ItemType Directory -Force -Path $out | Out-Null

# ---- assemble the filter chain ----
$chain = @()
if ($StartFrame -gt 0 -or $Length -gt 0) {
    $trim = "trim=start_frame=$StartFrame"
    if ($Length -gt 0) { $trim += ":end_frame=$($StartFrame + $Length)" }
    $chain += $trim, 'setpts=PTS-STARTPTS'
}
if ($Delogo) {
    $d = $Delogo -split ','
    if ($d.Count -ne 4) { throw "-Delogo wants 'x,y,w,h', got '$Delogo'." }
    $chain += "delogo=x=$($d[0]):y=$($d[1]):w=$($d[2]):h=$($d[3])"
}
$chain += "scale=$($Width):-2"
$pre = $chain -join ','

if ($PingPong) {
    # The reversed branch drops its first frame, which duplicates the forward
    # branch's last. Without that the turnaround holds one frame twice and
    # reads as a hitch.
    $filter = "[0:v]$pre,split[a][b];[b]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1[v]"
} else {
    $filter = "[0:v]$pre[v]"
}

Write-Host "Encoding hero loop$(if ($PingPong) { ' (ping-pong)' })..."
& $ffmpeg -y -v error -i $Source `
    -filter_complex $filter -map '[v]' `
    -an `
    -c:v libx264 -profile:v main -pix_fmt yuv420p `
    -crf $Crf -preset slow `
    -movflags +faststart `
    (Join-Path $out 'hero-loop.mp4')
if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed encoding the loop." }

# Poster: painted behind the video so there is something to look at during the
# fetch, and it is all a reduced-motion visitor ever sees. Taken from the same
# processed chain so it matches the first frame exactly - a poster that does not
# match causes a visible pop when the video starts.
Write-Host "Extracting poster frame..."
& $ffmpeg -y -v error -i $Source `
    -filter_complex "[0:v]$pre,select=eq(n\,0)[v]" -map '[v]' -frames:v 1 `
    -q:v 5 (Join-Path $out 'hero-poster.jpg')
if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed extracting the poster." }

Get-ChildItem $out -Filter 'hero-*' | ForEach-Object {
    "{0,-18} {1,8:N0} KB" -f $_.Name, ($_.Length / 1KB)
}
Write-Host "`nKeep hero-loop.mp4 under ~2 MB. If it is over, lower -Width or raise -Crf."
