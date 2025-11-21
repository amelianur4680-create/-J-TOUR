// script.js (VERSI TANPA FITUR BOOKMARK)

// --- Bagian 1: Logika Mode Gelap/Terang ---
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

function toggleTheme() {
    if (bodyElement.classList.contains('dark-mode')) {
        bodyElement.classList.remove('dark-mode');
        themeToggleBtn.textContent = 'Mode Gelap 🌙';
        localStorage.setItem('theme', 'light');
    } else {
        bodyElement.classList.add('dark-mode');
        themeToggleBtn.textContent = 'Mode Terang ☀️';
        localStorage.setItem('theme', 'dark');
    }
}
themeToggleBtn.addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        bodyElement.classList.add('dark-mode');
        themeToggleBtn.textContent = 'Mode Terang ☀️';
    }
    
    inisiasiAplikasi();
});


// script.js - Fungsi tampilkanRekomendasi (PENGEMBALIAN LOGIKA CHECK-IN/OUT)

const listContainer = document.getElementById('rekomendasi-list');

function tampilkanRekomendasi(data) {
    listContainer.innerHTML = '';
    
    if (data.length === 0) {
        listContainer.innerHTML = `<h2 style="text-align: center; margin-top: 30px;">
            😥 Tidak ada rekomendasi yang cocok dengan kriteria Anda.
        </h2>`;
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('rekomendasi-card');
        
        // --- LOGIKA DINAMIS HOTEL: Dibuat lebih kuat ---
        
        let labelBuka = 'Jam Buka';
        let labelTutup = 'Jam Tutup';
        
        // Cek kategori: kita ubah kategori di data.js dan string 'hotel' ke huruf kecil semua sebelum membandingkan.
        // Fungsi toLowerCase() memastikan 'Hotel', 'HOTEL', atau 'hotel' dianggap sama.
        if (item.kategori && item.kategori.toLowerCase() === 'hotel') { 
            labelBuka = 'Check-in';
            labelTutup = 'Check-out';
        }
        
        // --- RENDERING CARD ---
        
        card.innerHTML = `
            <h3>${item.nama}</h3>
            <p class="category">Kategori: ${item.kategori} | Lokasi: ${item.kota}</p>
            <hr>
            <div class="card-details">
                <p><strong>Deskripsi:</strong> ${item.deskripsi}</p>
                <p><strong>Kecamatan:</strong> ${item.kecamatan}</p>
                
                <p><strong>${labelBuka}:</strong> ${item.jamBuka}</p>
                <p><strong>${labelTutup}:</strong> ${item.jamTutup}</p>
                
                <p class="price"><strong>Harga:</strong> ${item.harga}</p>
                <a href="${item.koordinatMaps}" target="_blank">Lihat di Peta 🗺️</a>
            </div>
        `;
        listContainer.appendChild(card);
    });
}  


// --- Bagian 3: Logika Pencarian dan Filter Murni ---
const searchInput = document.getElementById('search-input');
const kategoriSelect = document.getElementById('kategori-select');

// FUNGSI UTAMA MURNI: Mengambil nilai dari input dan dropdown, lalu memproses data
function applyFilterAndSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedKategori = kategoriSelect.value;
    
    let hasilFilter = rekomendasiJatim.filter(item => {
        // Logika 1: Filter Kategori
        const kategoriMatch = (selectedKategori === 'Semua' || item.kategori === selectedKategori);

        // Logika 2: Pencarian Teks (Search Term)
        const searchMatch = 
            item.nama.toLowerCase().includes(searchTerm) ||
            item.kota.toLowerCase().includes(searchTerm) ||
            item.deskripsi.toLowerCase().includes(searchTerm);
        
        // Hanya tampilkan item jika kedua logika (Kategori DAN Search) cocok
        return kategoriMatch && searchMatch;
    });

    tampilkanRekomendasi(hasilFilter);
}


// Fungsi untuk mengisi dropdown kategori secara dinamis (TETAP SAMA)
function populateKategoriDropdown() {
    const kategoriUnik = [...new Set(rekomendasiJatim.map(item => item.kategori))];
    
    kategoriUnik.forEach(kategori => {
        const option = document.createElement('option');
        option.value = kategori;
        option.textContent = kategori;
        kategoriSelect.appendChild(option);
    });
}


// Fungsi Inisiasi Aplikasi (TIDAK ADA LOGIKA NAVIGASI/BOOKMARK)
function inisiasiAplikasi() {
    // 1. Isi Dropdown Kategori
    populateKategoriDropdown();

    // 2. Pasang Event Listeners untuk Filter/Search
    searchInput.addEventListener('input', applyFilterAndSearch);
    kategoriSelect.addEventListener('change', applyFilterAndSearch);

    // 3. Tampilkan semua data di awal
    applyFilterAndSearch(); 
}