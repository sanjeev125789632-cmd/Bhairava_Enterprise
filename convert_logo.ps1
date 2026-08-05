Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\majir\OneDrive\Desktop\Bhairava_Enterprises_2\Bhairava_Enterprise.png"
$img = [System.Drawing.Image]::FromFile($srcPath)

Write-Host "Source image size:" $img.Width "x" $img.Height

# Function to resize image nicely with high quality bicubic interpolation
function Resize-Image($srcImg, $width, $height) {
    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($srcImg, 0, 0, $width, $height)
    $g.Dispose()
    return $bmp
}

# 1. Copy or resize full logo to assets/images/logo.png
$logoImg = Resize-Image $img 512 512
$logoImg.Save("c:\Users\majir\OneDrive\Desktop\Bhairava_Enterprises_2\assets\images\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$logoImg.Dispose()
Write-Host "Saved assets/images/logo.png"

# 2. Create favicon PNGs (32x32, 48x48, 180x180, 512x512)
$fav32 = Resize-Image $img 32 32
$fav32.Save("c:\Users\majir\OneDrive\Desktop\Bhairava_Enterprises_2\favicon-32x32.png", [System.Drawing.Imaging.ImageFormat]::Png)
$fav32.Save("c:\Users\majir\OneDrive\Desktop\Bhairava_Enterprises_2\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$fav32.Dispose()

$fav180 = Resize-Image $img 180 180
$fav180.Save("c:\Users\majir\OneDrive\Desktop\Bhairava_Enterprises_2\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$fav180.Dispose()

# Create favicon.ico from 32x32
$iconBmp = Resize-Image $img 32 32
$iconHandle = $iconBmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($iconHandle)
$stream = [System.IO.File]::Create("c:\Users\majir\OneDrive\Desktop\Bhairava_Enterprises_2\favicon.ico")
$icon.Save($stream)
$stream.Close()
$iconBmp.Dispose()
Write-Host "Saved favicons (favicon.png, favicon-32x32.png, favicon.ico, apple-touch-icon.png)"

# Also create thank-you directory favicon copies if needed
Copy-Item "c:\Users\majir\OneDrive\Desktop\Bhairava_Enterprises_2\favicon.png" "c:\Users\majir\OneDrive\Desktop\Bhairava_Enterprises_2\thank-you\favicon.png" -Force

$img.Dispose()
