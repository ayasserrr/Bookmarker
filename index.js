document.getElementById('bookmarkForm').addEventListener('submit', addBookmark);

function addBookmark(e) {
  e.preventDefault();

  //---------------------------- Get form values------------------------
  const siteName = document.getElementById('siteName').value;
  const siteURL = document.getElementById('siteURL').value;

  if (!siteName || !siteURL) {
    alert('Please fill in all fields.');
    return;
  }

  const bookmark = { name: siteName, url: siteURL };

  //---------------------------- Save bookmark to localStorage-----------------------
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  document.getElementById('bookmarkForm').reset();
  displayBookmarks();
}

function displayBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  const bookmarksList = document.getElementById('bookmarksList');
  bookmarksList.innerHTML = '';

  bookmarks.forEach((bookmark, index) => {
    bookmarksList.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${bookmark.name}</td>
        <td>
          <a href="${bookmark.url}" target="_blank" class="btn btn-sm btn-visit">Visit</a>
        </td>
        <td>
          <button class="btn btn-sm btn-delete" onclick="deleteBookmark(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteBookmark(index) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}

//-------------------- Display bookmarks ------------------------
document.addEventListener('DOMContentLoaded', displayBookmarks);
