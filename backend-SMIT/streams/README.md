Arey Sahi hai, bilkul clean aur straight-to-the-point rakhte hain!

Koi extra options nahi, koi file generator script nahi. Direct aapka text aur uske neeche `sample.txt` ko read karne ka simple code.

Is poore code block ko copy karke apni **`README.md`** me daal lo:

```markdown
# Streaming kiya hota hai 
jiase jaise data ata hai waisi wo data play horaha hai example yotube video aik sath load nahi hoti 

# Use if we need to send 500mb file or read 
500mb ki file hai direct load nahi karskte tou hum stream karte hai ke chunk by chunk read karo file ko 
or jaise jaise wo read karega chunk hum wo chunk response me send karte jayege 
isse server ki memory spike up nahi hgi kyunke hum chunk me bhej rahe hai 

---

## 🛠️ Implementation in Node.js

Root directory me rakhi `sample.txt` file ko chunk-by-chunk read karke client ko bhejna:

### File Stream Response Code
```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/stream') {
    // Root directory se sample.txt ko read karna
    const readStream = fs.createReadStream('./sample.txt');
    
    // Chunk by chunk response me stream karna
    readStream.pipe(res); 

    // Error Handling
    readStream.on('error', (err) => {
      res.statusCode = 500;
      res.end('File read karne me error aya!');
    });
  }
});

server.listen(3000, () => console.log('Server running: http://localhost:3000/stream'));

```

---

## 📚 Stream Types & Events

### Stream Types

* **Readable:** Data read karne ke liye (e.g., `fs.createReadStream('./sample.txt')`)
* **Writable:** Data write karne ke liye (e.g., `res` response object)
* **Duplex:** Read aur Write dono ek sath (e.g., Sockets)
* **Transform:** Data stream hote hue change karna (e.g., Zip compression)

### Main Stream Events

* **`data`**: Jab ek naya chunk read hota hai.
* **`end`**: Jab poori file read ho chuki ho.
* **`error`**: Jab reading/writing me koi masla aaye.
* **`drain`**: Jab stream agla chunk lene ke liye tayyar ho (Backpressure).

```

```
---

## 🗜️ Compression with zlib (Gzip)

Bhai zlib ek built-in Node.js module hai jo data ko compress/decompress karta hai. Stream ke sath milke bina memory spike ke file ko zip kar sakte hain.

### Kaise kaam karta hai

Pipeline simple hai:

**Read Stream → zlib Transform Stream (gzip) → Write Stream**

Matlab file ko chunk-by-chunk read karo, har chunk ko gzip se compress karo, aur compressed chunk ko output file me likhte jao. Poori file kabhi bhi ek sath memory me load nahi hoti.

### Code Example

```javascript
const fs = require('fs');
const zlib = require('zlib');

// sample.txt ko read karo, gzip se compress karo, sample.txt.gz me likho
fs.createReadStream('./sample.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./sample.txt.gz'));
```

Yahan `.pipe()` chain lagi hui hai — pehla pipe read stream ka data zlib ko deta hai, dusra pipe zlib ka compressed output write stream ko deta hai.

### Decompress (Unzip) kaise kare

```javascript
fs.createReadStream('./sample.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('./sample-decompressed.txt'));
```

### Kyun use kare

* **Bandwidth kam lagti hai** — compressed file chhoti hoti hai, transfer fast hota hai
* **Memory efficient** — chunk by chunk compress hota hai, RAM pe pura file load nahi hota
* **HTTP responses bhi compress ho sakte hain** — server se client tak gzip response bhej sakte ho (`res` ko bhi ek Writable stream ki tarah zlib ke through pipe kar sakte ho)

### Common zlib Methods

* **`zlib.createGzip()`** — Compress karne ke liye (Transform stream)
* **`zlib.createGunzip()`** — Gzip file ko decompress karne ke liye
* **`zlib.createDeflate()` / `createInflate()`** — Alternative compression algorithm