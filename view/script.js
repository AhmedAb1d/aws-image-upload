const CDN = 'https://d2qzpg3wpk2sc3.cloudfront.net/';

document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var formData = new FormData();
    var files = document.getElementById('files').files;

    for (var i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Upload successful');
        }
    };
    xhr.send(formData);
});

document.getElementById('refresh').addEventListener('click', function (e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/images', true);
    xhr.onreadystatechange = function () {
        var response = JSON.parse(xhr.responseText);
        var imageUrls = response.images;

        var imageList = document.getElementById('imageList');
        imageList.innerHTML = '';

        imageUrls.forEach(function (imageUrl) {
            var imageElement = document.createElement('img');
            imageElement.src = CDN + imageUrl;
            console.log(imageElement)
            imageList.appendChild(imageElement);
        });
    };

    xhr.send();
}
);
