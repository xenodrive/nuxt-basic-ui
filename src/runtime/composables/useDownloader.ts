import { ref } from '#imports';

function basename(path: string) {
  return path.split('/').reverse()[0];
}

export default function () {
  const downloading = ref(false);

  async function download(url: string, fetchOption: RequestInit = {}, filename?: string) {
    downloading.value = true;
    try {
      const res = await fetch(url, fetchOption);

      const contentDisposition = res.headers
        .get('Content-Disposition')
        ?.replace(/.*filename\*=UTF-8''(.*)/, (...match) => decodeURI(match[1]));

      return downloadBlobAs(filename || contentDisposition || basename(url), await res.blob());
    } finally {
      downloading.value = false;
    }
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

  return {
    download,
    downloadBlobAs,
    downloading,
  };
}
