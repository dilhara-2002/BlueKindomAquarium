@echo off
echo 🛍️ Blue Kingdom Aquarium - Product Management
echo ================================================

if "%1"=="" (
    echo Usage: manageProducts.bat [command] [arguments]
    echo.
    echo Commands:
    echo   add "json"              Add a single product
    echo   add-multiple "json"     Add multiple products  
    echo   list                    List all products
    echo   update-image id file    Update product image
    echo   delete id               Delete a product
    echo   sample                  Add sample products
    echo.
    echo Examples:
    echo   manageProducts.bat add "{\"name\":\"Gold Fish\",\"price\":100,\"category\":\"fish\",\"stock\":10}"
    echo   manageProducts.bat list
    echo   manageProducts.bat sample
    goto :eof
)

cd /d "%~dp0"
node src/scripts/manageProducts.js %*