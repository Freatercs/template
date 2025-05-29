// import { getTopArtists, getTopTracks, searchArtists, searchTracks } from './api.js';

// /**
//  * Инициализирует страницу при загрузке DOM
//  */
// document.addEventListener('DOMContentLoaded', () => {
//     initPage();
//     setupSearch();
// });

// /**
//  * Инициализирует страницу в зависимости от текущего пути URL
//  */
// function initPage() {
//     const path = window.location.pathname;
    
//     if (path.includes('top-artists')) {
//         loadTopArtists();
//     } else if (path.includes('top-tracks')) {
//         loadTopTracks();
//     }
// }

// /**
//  * Загружает и отображает популярных исполнителей
//  */
// async function loadTopArtists() {
//     try {
//         showLoader();
//         const artists = await getTopArtists();
//         renderArtists(artists);
//     } catch (error) {
//         showError('Не удалось загрузить исполнителей. Пожалуйста, обновите страницу или попробуйте позже.');
//     } finally {
//         hideLoader();
//     }
// }

// /**
//  * Загружает и отображает популярные треки
//  */
// async function loadTopTracks() {
//     try {
//         showLoader();
//         const tracks = await getTopTracks();
//         renderTracks(tracks);
//     } catch (error) {
//         showError('Не удалось загрузить треки. Пожалуйста, обновите страницу или попробуйте позже.');
//     } finally {
//         hideLoader();
//     }
// }

// /**
//  * Отображает список исполнителей
//  * @param {Array} artists - Массив объектов исполнителей
//  */
// function renderArtists(artists) {
//     const container = document.querySelector('.artists-grid');
//     if (!container) return;
    
//     if (!artists?.length) {
//         container.innerHTML = '<p class="no-results">Ничего не найдено</p>';
//         return;
//     }
    
//     container.innerHTML = artists.map(artist => {
//         // Получаем изображение из массива image, выбирая самое большое доступное
//         const image = artist.image?.find(img => img.size === 'large')?.['#text'] || 
//                      artist.image?.find(img => img.size === 'medium')?.['#text'] ||
//                      'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
        
//         return `
//             <div class="artist-card">
//                 <div class="artist-image" style="background-image: url('${image}')"></div>
//                 <h3>${artist.name}</h3>
//                 <p>${artist.listeners ? parseInt(artist.listeners).toLocaleString() + ' слушателей' : ''}</p>
//             </div>
//         `;
//     }).join('');
// }

// /**
//  * Отображает список треков
//  * @param {Array} tracks - Массив объектов треков
//  */
// function renderTracks(tracks) {
//     const container = document.querySelector('.tracks-list');
//     if (!container) return;
    
//     if (!tracks?.length) {
//         container.innerHTML = '<p class="no-results">Ничего не найдено</p>';
//         return;
//     }
    
//     container.innerHTML = tracks.map((track, index) => {
//         // Получаем изображение из массива image, выбирая самое большое доступное
//         const image = track.image?.find(img => img.size === 'large')?.['#text'] || 
//                      track.image?.find(img => img.size === 'medium')?.['#text'] ||
//                      'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
        
//         return `
//             <div class="track-item">
//                 <div class="track-number">${index + 1}</div>
//                 <div class="track-image" style="background-image: url('${image}')"></div>
//                 <div class="track-info">
//                     <h3>${track.name}</h3>
//                     <p>${track.artist.name}</p>
//                 </div>
//                 <div class="track-plays">${track.listeners ? parseInt(track.listeners).toLocaleString() + ' прослушиваний' : ''}</div>
//             </div>
//         `;
//     }).join('');
// }

// /**
//  * Настраивает функциональность поиска
//  */
// function setupSearch() {
//     const form = document.getElementById('search-form');
//     if (!form) return;

//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const input = form.querySelector('input');
//         const query = input.value.trim();
        
//         if (query) {
//             try {
//                 await performSearch(query);
//             } catch (error) {
//                 showError('Ошибка при поиске. Пожалуйста, попробуйте еще раз.');
//             }
//         }
//     });
// }

// /**
//  * Выполняет поиск в зависимости от текущей страницы
//  * @param {string} query - Поисковый запрос
//  */
// async function performSearch(query) {
//     showLoader();
//     try {
//         const path = window.location.pathname;
        
//         if (path.includes('top-artists') || path.includes('index')) {
//             const artists = await searchArtists(query);
//             renderArtists(artists);
//         } else if (path.includes('top-tracks')) {
//             const tracks = await searchTracks(query);
//             renderTracks(tracks);
//         }
//     } finally {
//         hideLoader();
//     }
// }

// /**
//  * Показывает индикатор загрузки
//  */
// function showLoader() {
//     document.body.classList.add('loading');
// }

// /**
//  * Скрывает индикатор загрузки
//  */
// function hideLoader() {
//     document.body.classList.remove('loading');
// }

// /**
//  * Показывает сообщение об ошибке пользователю
//  * @param {string} message - Текст сообщения об ошибке
//  */
// function showError(message) {
//     const errorElement = document.createElement('div');
//     errorElement.className = 'error-message';
//     errorElement.textContent = message;
//     document.body.prepend(errorElement);
//     setTimeout(() => errorElement.remove(), 5000);
// }