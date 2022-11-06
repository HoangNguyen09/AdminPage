const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 5550;
app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`);
});
