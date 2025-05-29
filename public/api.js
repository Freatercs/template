// /**
//  * Конфигурация API Last.fm
//  * @constant {string} API_KEY - API ключ для Last.fm
//  * @constant {string} API_URL - Базовый URL для API Last.fm
//  */
// const API_KEY = 'b2ce21b3d5ee14e3eaa2d5f3714a54e3';
// const API_URL = 'https://ws.audioscrobbler.com/2.0/';

// /**
//  * Получает данные из API Last.fm
//  * @param {Object} params - Параметры запроса к API
//  * @returns {Promise<Object>} Данные ответа от API
//  * @throws {Error} Если запрос к API завершился с ошибкой
//  */
// async function fetchLastFmData(params) {
//     const queryParams = new URLSearchParams({
//         ...params,
//         api_key: API_KEY,
//         format: 'json'
//     });

//     try {
//         const response = await fetch(`${API_URL}?${queryParams}`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         if (data.error) {
//             throw new Error(`API error: ${data.message}`);
//         }
//         return data;
//     } catch (error) {
//         console.error('Error fetching Last.fm data:', error);
//         showError(`Ошибка при получении данных: ${error.message}. Пожалуйста, попробуйте позже.`);
//         throw error;
//     }
// }

// /**
//  * Получает список популярных исполнителей с Last.fm
//  * @param {number} [limit=12] - Количество исполнителей для получения
//  * @returns {Promise<Array>} Массив популярных исполнителей
//  */
// async function getTopArtists(limit = 12) {
//     const data = await fetchLastFmData({
//         method: 'chart.gettopartists',
//         limit: limit
//     });
//     return data.artists.artist;
// }

// /**
//  * Получает список популярных треков с Last.fm
//  * @param {number} [limit=12] - Количество треков для получения
//  * @returns {Promise<Array>} Массив популярных треков
//  */
// async function getTopTracks(limit = 12) {
//     const data = await fetchLastFmData({
//         method: 'chart.gettoptracks',
//         limit: limit
//     });
//     return data.tracks.track;
// }

// /**
//  * Выполняет поиск исполнителей на Last.fm
//  * @param {string} query - Поисковый запрос
//  * @param {number} [limit=12] - Количество результатов для возврата
//  * @returns {Promise<Array>} Массив найденных исполнителей
//  */
// async function searchArtists(query, limit = 12) {
//     const data = await fetchLastFmData({
//         method: 'artist.search',
//         artist: query,
//         limit: limit
//     });
//     return data.results.artistmatches.artist;
// }

// /**
//  * Выполняет поиск треков на Last.fm
//  * @param {string} query - Поисковый запрос
//  * @param {number} [limit=12] - Количество результатов для возврата
//  * @returns {Promise<Array>} Массив найденных треков
//  */
// async function searchTracks(query, limit = 12) {
//     const data = await fetchLastFmData({
//         method: 'track.search',
//         track: query,
//         limit: limit
//     });
//     return data.results.trackmatches.track;
// }

// /**
//  * Отображает сообщение об ошибке пользователю
//  * @param {string} message - Текст сообщения об ошибке
//  */
// function showError(message) {
//     const errorElement = document.createElement('div');
//     errorElement.className = 'error-message';
//     errorElement.textContent = message;
//     document.body.prepend(errorElement);
//     setTimeout(() => errorElement.remove(), 5000);
// }

// // Экспорт функций для использования в app.js
// export { 
//     getTopArtists, 
//     getTopTracks, 
//     searchArtists, 
//     searchTracks, 
//     fetchLastFmData 
// };