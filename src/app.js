// All data
const products = JSON.parse(localStorage.getItem('products')) || [];

// Produk

    // Add Produk
    function addProduk(nama, harga, stok) {
        // Get last id
        const data = JSON.parse(localStorage.getItem('products'));
        let id = 1;
        if (data && data.length > 0) {
            id = data[data.length - 1][0] + 1;
        }

        const newProduk = [id, nama, harga, stok];
        products.push(newProduk);

        // Save to localstorage
        localStorage.setItem('products', JSON.stringify(products));

        // Refresh table
        getProduk();
    }

    // Get Produk
    function getProduk() {
        const tableProduk = $('#dataProduk')

        // Clear table
        tableProduk.html('');

        // Get data from localstorage
        const data = JSON.parse(localStorage.getItem('products'));

        if (data) {
            // Loop data
            data.forEach(item => {
                const row = `
                    <tr>
                        <td>${item[0]}</td>
                        <td>${item[1]}</td>
                        <td>Rp. ${new Intl.NumberFormat('id-ID').format(item[2])}</td>
                        <td>${new Intl.NumberFormat().format(item[3])}</td>
                    </tr>
                `;
                tableProduk.append(row);
            });
        }
    }

// Kurir

    // Add Kurir
    function addKurir(nama, harga) {
        
    }