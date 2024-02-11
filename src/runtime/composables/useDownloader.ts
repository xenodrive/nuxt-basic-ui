function basename(path: string) {
  return path.split('/').reverse()[0];
}

async function download(url: string, fetchOption: RequestInit = {}, filename?: string) {
  const res = await fetch(url, fetchOption);

  const contentDisposition = res.headers
    .get('Content-Disposition')
    ?.replace(/.*filename\*=UTF-8''(.*)/, (...match) => decodeURI(match[1]));

  return downloadBlobAs(filename || contentDisposition || basename(url), await res.blob());
}

function downloadBlobAs(filename: string, blob: Blob) {
  const obj = window.URL.createObjectURL(blob);

  const downloader = document.createElement('a');
  downloader.setAttribute('href', obj);
  downloader.setAttribute('download', filename);
  downloader.click();

  setTimeout(() => {
    window.URL.revokeObjectURL(obj);
  }, 100);

  return true;
}

export default function () {
  return {
    download,
    downloadBlobAs,
  };
}
