function numberToWords(number) {
   let word = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas']

   if (number <= 0) {
      return ''
   } else {
      if (number <= 11) {
         return word[number]
      } else if (number < 20) {
         return word[number % 10] + ` belas `
      } else if (number < 100) {
         let puluhan = Math.floor(number / 10)
         return word[puluhan] + ` puluh ` + numberToWords(number % 10)
      } else if (number < 200) {
         return `seratus` + numberToWords(number % 100)
      } else if (number < 1000) {
         let ratusan = Math.floor(number / 100)
         return word[ratusan] + ` ratus ` + numberToWords(number % 100)
      } else if (number < 2000) {
         return `seribu ` + numberToWords(number % 1e3)
      } else if (number < 10000) {
         let ribuan = Math.floor(number / 1000)
         return word[ribuan] + ` ribu ` + numberToWords(number % 1000)
      } else if (number < 1e5) {
         let ribuan = Math.floor(number / 1e3)
         return numberToWords(ribuan) + `ribu ` + numberToWords(number % 1e3)
      } else if (number < 1e6) {
         let ribuan = Math.floor(number / 1e3)
         return numberToWords(ribuan) + ` ribu ` + numberToWords(number % 1e3)
      } else if (number < 1e9) {
         let jutaan = Math.floor(number / 1e6)
         return numberToWords(jutaan) + ` juta ` + numberToWords(number % 1e6)
      } else if (number < 1e12) {
         let milyar = Math.floor(number / 1e9)
         return numberToWords(milyar) + ` miliar ` + numberToWords(number % 1e9)
      } else if (number < 1e15) {
         let triliun = Math.floor(number / 1e12)
         return numberToWords(triliun) + ` triliun ` + numberToWords(number % 1e12)
      }
   }
}

export default numberToWords
