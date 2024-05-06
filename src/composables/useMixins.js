export default function useMixins() {

    // accept only numbers in input field 
    const onlyNumbers = (event) => {
        let keyCode = event.keyCode ? event.keyCode : event.which;
        if (keyCode < 48 || keyCode > 57) {
          event.preventDefault();
        }
      };
      const onlyHypenNumbers = (event) => {
        let keyCode = event.keyCode ? event.keyCode : event.which;
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 45) {
          event.preventDefault();
        }
      };
      const openLink = (link) => {
        if (link) {
          // Check if the link starts with "http://" or "https://"
          if (link.startsWith('http://') || link.startsWith('https://')) {
            window.open(link, '_blank');
          } else {
            // If the link doesn't have a protocol (e.g., "http://"), add "http://" to it
            window.open('http://' + link, '_blank');
          }
        }
      }
      const koreanDateFormat = (d) => {
        if (!d) return;
        let date = new Date(d);
        date = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일';
        return date;
      };
      const saveFile = (_response, _filename) => {
        const blob = new Blob([_response.data], {
          type: _response.headers["content-type"],
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = _filename;
        link.click();
      }

      const isMobileDevice = () => {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      }
      const addOrdinalSuffix = (number) => {
        if (typeof number !== 'number' || isNaN(number)) {
          return '';
        }
    
        // Special case for 11, 12, and 13
        if (number % 100 >= 11 && number % 100 <= 13) {
          return number + 'th';
        }
    
        switch (number % 10) {
          case 1:
            return number + 'st';
          case 2:
            return number + 'nd';
          case 3:
            return number + 'rd';
          default:
            return number + 'th';
        }
      }
      const niceBytes = (x) => {
        const units = ['bytes', 'KB', 'MB', 'GB'];
        let l = 0, n = parseInt(x, 10) || 0;
    
        while (n >= 1024 && ++l) {
          n = n / 10
          24;
        }
    
        return (n.toFixed(n < 10 && l > 0 ? 3 : 0) + ' ' + units[l]);
      }

    //   return all function 
    return {
        onlyNumbers,
        onlyHypenNumbers,
        openLink,
        koreanDateFormat,
        saveFile,
        isMobileDevice,
        addOrdinalSuffix,
        niceBytes
    }
}