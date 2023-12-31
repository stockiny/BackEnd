const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { mongoose, connectDB } = require("./Middleware/connect");
const userRoutes = require("./Route/admin");
const fournisseurRoutes = require('./Route/fournisseur')
const clientRoutes = require('./Route/client')
const categoryRoutes = require('./Route/category')
const articleRoutes = require('./Route/article')
const sortieRoutes = require('./Route/sortie')



const os = require('os');




const path = require('path');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

const port = 3000;


app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/fournisseur",fournisseurRoutes);
app.use("/api/client",clientRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/sortie", sortieRoutes);





app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
    res.send('Hello World!');
  });


  function getMacAddress() {
    const networkInterfaces = os.networkInterfaces();
    const interfaces = Object.values(networkInterfaces).flat();
  
    const macAddress = interfaces
      .filter((iface) => iface.mac && iface.mac !== '00:00:00:00:00:00')
      .map((iface) => iface.mac)[0];
  
    return macAddress;
  }
  
  const macAddress = getMacAddress();
  
  if (macAddress) {
    console.log('MAC Address:', macAddress);
  } else {
    console.log('MAC Address not found.');
  }
  
  
  
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });