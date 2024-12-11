var semuaProduk = []; // Array yang akan menyimpan data
        var kodeIncrement = 1;  // kode produk mulai dari 01
        var editIndex = -1; // 

        function menyimpanProduk() { // function berfungsi untuk memanggil
            var kodeProduk = document.getElementById('kode-produk').value; // documen berfungsi untuk mengambil elemen berdasarkan id nya
            var namaProduk = document.getElementById('nama-produk').value;
            var hargaProduk = document.getElementById('harga-produk').value;
            var satuanProduk = document.getElementById('satuan-produk').value;
            var kategoriProduk = document.getElementById('kategori-produk').value;
            var urlgambarProduk = document.getElementById('urlgambar-produk').value;
            var stokProduk = document.getElementById('stok-produk').value;

            if (!namaProduk || !hargaProduk || !satuanProduk || !kategoriProduk || !urlgambarProduk || !stokProduk) { 
                alert('Semua kolom harus diisi!');
                return;
            }

            if (editIndex === -1) { // -1 digunakan untuk menandakan bahwa elemen atau item yang dicari tidak ditemukan
                // Menambahkan produk baru ke array
                var kodeProdukBaru = 'MD-' + String(kodeIncrement).padStart(2, '0');
                semuaProduk.push({ // menambahkan elemen baru ke dalam array
                    kodeProduk: kodeProdukBaru,
                    namaProduk,
                    hargaProduk,
                    satuanProduk,
                    kategoriProduk,
                    urlgambarProduk,
                    stokProduk
                });
                kodeIncrement++;  // Increment kode produk setelah menambahkan produk baru
            } else {
                // Mengupdate produk yang sudah ada
                semuaProduk[editIndex] = {
                    kodeProduk,  
                    namaProduk,
                    hargaProduk,
                    satuanProduk,
                    kategoriProduk,
                    urlgambarProduk,
                    stokProduk
                };
                editIndex = -1; // Reset editIndex setelah update produk
            }

            // Reset form dan tampilkan kode produk berikutnya
            document.getElementById('kode-produk').value = 'MD-' + String(kodeIncrement).padStart(2, '0');
            document.getElementById('form-produk').reset(); // Reset form
            menampilkanTable();
        }

        function menampilkanTable() {
            var tBody = document.getElementById("t-body");
            tBody.innerHTML = '';

            semuaProduk.forEach(function (produk, index) {
                var tr = tBody.insertRow();
                var backgroundColor = (produk.stokProduk < 5) ? 'red' : 'white';

                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${produk.kodeProduk}</td>
                    <td>${produk.namaProduk}</td>
                    <td>${produk.hargaProduk}</td>
                    <td>${produk.satuanProduk}</td>
                    <td>${produk.kategoriProduk}</td>
                    <td style="background-color: ${backgroundColor};">${produk.stokProduk}</td>
                    <td><img src="${produk.urlgambarProduk}" alt="Product Image" width="50px" height="50px"></td>
                    <td>
                        <button onclick="editProduk(${index})">Edit</button> |
                        <button onclick="hapusProduk(${index})">Delete</button>
                    </td>
                `;
            });
        }

        function editProduk(index) {
            var produk = semuaProduk[index];
            document.getElementById('kode-produk').value = produk.kodeProduk;
            document.getElementById('nama-produk').value = produk.namaProduk;
            document.getElementById('harga-produk').value = produk.hargaProduk;
            document.getElementById('satuan-produk').value = produk.satuanProduk;
            document.getElementById('kategori-produk').value = produk.kategoriProduk;
            document.getElementById('urlgambar-produk').value = produk.urlgambarProduk;
            document.getElementById('stok-produk').value = produk.stokProduk;

            editIndex = index; // Menyimpan indeks produk yang sedang diedit, ketika di submit tidak jadi halaman baru
        }

        function hapusProduk(index) {
            semuaProduk.splice(index, 1); // Menghapus produk dari array
            menampilkanTable();
        }

        // Menampilkan kode produk pertama kali
        document.getElementById('kode-produk').value = 'MD-' + String(kodeIncrement).padStart(2, '0');