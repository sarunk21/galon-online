// All data
const products = JSON.parse(localStorage.getItem('products')) || [];
const couriers = JSON.parse(localStorage.getItem('couriers')) || [];

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
                        <td class="text-center">
                            <button class="btn btn-danger" onclick="deleteProduk(${item[0]})">Delete</button>
                        </td>
                    </tr>
                `;
                tableProduk.append(row);
            });
        }
    }

    // Delete Produk
    function deleteProduk(id) {
        if (confirm('Apakaah anda yakin?')) {
            // Get data from localstorage
            const data = JSON.parse(localStorage.getItem('products'));
    
            // Find index
            const index = data.findIndex(item => item[0] === id);
    
            // Delete data
            data.splice(index, 1);
    
            // Save to localstorage
            localStorage.setItem('products', JSON.stringify(data));
        }

        // Refresh table
        getProduk();
    }

// Kurir

    // Add Kurir
    function addKurir(nama) {
        // Get last id
        const data = JSON.parse(localStorage.getItem('couriers'));
        let id = 1;
        if (data && data.length > 0) {
            id = data[data.length - 1][0] + 1;
        }

        const newKurir = [id, nama];
        couriers.push(newKurir);

        // Save to localstorage
        localStorage.setItem('couriers', JSON.stringify(couriers));

        // Refresh table
        getKurir();
    }

    // Get Kurir
    function getKurir() {
        const tableKurir = $('#dataKurir')

        // Clear table
        tableKurir.html('');

        // Get data from localstorage
        const data = JSON.parse(localStorage.getItem('couriers'));

        if (data) {
            // Loop data
            data.forEach(item => {
                const row = `
                    <tr>
                        <td>${item[0]}</td>
                        <td>${item[1]}</td>
                        <td class="text-center">
                            <button class="btn btn-danger" onclick="deleteKurir(${item[0]})">Delete</button>
                        </td>
                    </tr>
                `;
                tableKurir.append(row);
            });
        }
    }

    // Delete Kurir
    function deleteKurir(id) {
        if (confirm('Apakaah anda yakin?')) {
            // Get data from localstorage
            const data = JSON.parse(localStorage.getItem('couriers'));
    
            // Find index
            const index = data.findIndex(item => item[0] === id);
    
            // Delete data
            data.splice(index, 1);
    
            // Save to localstorage
            localStorage.setItem('couriers', JSON.stringify(data));
        }

        // Refresh table
        getKurir();
    }

