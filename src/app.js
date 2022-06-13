// All data
const products = JSON.parse(localStorage.getItem('products')) || [];
const couriers = JSON.parse(localStorage.getItem('couriers')) || [];
const customers = JSON.parse(localStorage.getItem('customers')) || [];
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const sortJarak = JSON.parse(localStorage.getItem('customers')) || [];

// Produk

// Add Produk
function addProduk(nama, harga, stok) {
    // Get last id
    const data = JSON.parse(localStorage.getItem('products'));
    let id = 1;
    if (data && data.length > 0) {
        id = data[data.length - 1][0] + 1;
    }

    const newProduk = [id, nama, parseInt(harga), parseInt(stok)];
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
        const index = data.findIndex(item => item[0] == id);

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
        const index = data.findIndex(item => item[0] == id);

        // Delete data
        data.splice(index, 1);

        // Save to localstorage
        localStorage.setItem('couriers', JSON.stringify(data));
    }

    // Refresh table
    getKurir();
}

// Customer

// Add Customer
function addCustomer(nama, notelp, alamat, jarak) {
    // Get last id
    const data = JSON.parse(localStorage.getItem('customers'));
    let id = 1;
    if (data && data.length > 0) {
        id = data[data.length - 1][0] + 1;
    }

    const newCustomer = [id, nama, notelp, alamat, parseInt(jarak)];
    customers.push(newCustomer);

    // Save to localstorage
    localStorage.setItem('customers', JSON.stringify(customers));

    // Refresh table
    getCustomer();
}

// Get Customer
function getCustomer() {
    const tableCustomer = $('#dataCustomer')

    // Clear table
    tableCustomer.html('');

    // Get data from localstorage
    const data = JSON.parse(localStorage.getItem('customers'));

    if (data) {
        // Loop data
        data.forEach(item => {
            const row = `
                    <tr>
                        <td>${item[0]}</td>
                        <td>${item[1]}</td>
                        <td>${item[2]}</td>
                        <td>${item[3]}</td>
                        <td>${item[4]}</td>
                        <td class="text-center">
                            <button class="btn btn-danger" onclick="deleteCustomer(${item[0]})">Delete</button>
                        </td>
                    </tr>
                `;
            tableCustomer.append(row);
        });
    }
}

// Delete Customer
function deleteCustomer(id) {
    if (confirm('Apakaah anda yakin?')) {
        // Get data from localstorage
        const data = JSON.parse(localStorage.getItem('customers'));

        // Find index
        const index = data.findIndex(item => item[0] == id);

        // Delete data
        data.splice(index, 1);

        // Save to localstorage
        localStorage.setItem('customers', JSON.stringify(data));
    }

    // Refresh table
    getCustomer();
}


// Transaksi

// Add Transaksi
function addTransaksi(id_customer, id_kurir, id_produk, jumlah) {
    // Data
    const dataProduk = products.filter(item => item[0] == id_produk);
    const dataCustomer = customers.filter(item => item[0] == id_customer);

    // Get last id
    const data = JSON.parse(localStorage.getItem('transactions'));
    let id = 1;
    if (data && data.length > 0) {
        id = data[data.length - 1][0] + 1;
    }

    // Total harga
    const totalHarga = (dataProduk[0][2] * jumlah) + (dataCustomer[0][4] > 8 ? dataCustomer[0][4] * 15000 : dataCustomer[0][4] * 7000);

    const newTransaksi = [id, id_customer, id_kurir, id_produk, jumlah, totalHarga];
    transactions.push(newTransaksi);

    // Kurangin stok produk
    const index = dataProduk[0][0] - 1;
    products[index][3] -= jumlah;

    // Save to localstorage
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('products', JSON.stringify(products));

    // Refresh table
    getTransaksi();
}

// Get Transaksi
function getTransaksi() {
    const tableTransaksi = $('#dataTransaksi')

    // Clear table
    tableTransaksi.html('');

    // Get data from localstorage
    const data = JSON.parse(localStorage.getItem('transactions'));

    if (data) {
        // Loop data
        data.forEach(item => {
            const namaCustomer = customers.filter(item2 => item2[0] == item[1])[0][1];
            const namaKurir = couriers.filter(item2 => item2[0] == item[2])[0][1];
            const namaProduk = products.filter(item2 => item2[0] == item[3])[0][1];

            const row = `
                    <tr>
                        <td>${item[0]}</td>
                        <td>${namaCustomer}</td>
                        <td>${namaKurir}</td>
                        <td>${namaProduk}</td>
                        <td>${new Intl.NumberFormat().format(item[4])}</td>
                        <td>Rp. ${new Intl.NumberFormat('id-ID').format(item[5])}</td>
                        <td class="text-center">
                            <button class="btn btn-danger" onclick="deleteTransaksi(${item[0]})">Delete</button>
                        </td>
                    </tr>
                `;
            tableTransaksi.append(row);
        });
    }
}

// Delete Transaks
function deleteTransaksi(id) {
    if (confirm('Apakaah anda yakin?')) {
        // Get data from localstorage
        const data = JSON.parse(localStorage.getItem('transactions'));

        // Find index
        const index = data.findIndex(item => item[0] == id);

        // Delete data
        data.splice(index, 1);

        // Save to localstorage
        localStorage.setItem('transactions', JSON.stringify(data));
    }

    // Refresh table
    getTransaksi();
}

// Sorting jarak toko ke customer
function sortingJarak() {
    // Sort data
    // Bubble sort
    for (let i = 0; i < sortJarak.length; i++) {

        for (let j = 0; j < (sortJarak.length - i - 1); j++) {

            if (sortJarak[j][4] > sortJarak[j + 1][4]) {

                let temp = sortJarak[j]
                sortJarak[j] = sortJarak[j + 1]
                sortJarak[j + 1] = temp
            }
        }
    }

    const tableCustomer = $('#sortedCustomer')

    // Clear table
    tableCustomer.html('');

    if (sortJarak && sortJarak.length > 0) {
        // Loop data
        sortJarak.forEach(item => {
            const row = `
                    <tr>
                        <td>${item[0]}</td>
                        <td>${item[1]}</td>
                        <td>${item[2]}</td>
                        <td>${item[3]}</td>
                        <td>${item[4]}</td>
                    </tr>
                `;
            tableCustomer.append(row);
        });
    }
}

sortingJarak();

// linked list
class Node {
    constructor(element) {
        this.element = element;
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(element) {
        let node = new Node(element);
        let current;

        if (this.head == null)
            this.head = node;
        else {
            current = this.head;

            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }
        this.size++;
    }

    isEmpty() {
        return this.size == 0;
    }

    size() {
        return this.size;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        if (this.head == null)
            return null;

        let current = this.head;

        while (current.next) {
            current = current.next;
        }

        return current;
    }
}

// Create linked list
let li = new LinkedList();

for (let i = 0; i < sortJarak.length; i++) {
    li.add(sortJarak[i]);
}

function getTotalCustomer() {
    alert('Total customer: ' + li.size);
}

function getFirstCustomer() {
    alert(`First customer: ${li.getFirst().element[1]}`);
}

function getLastCustomer() {
    alert(`Last customer: ${li.getLast().element[1]}`);
}
