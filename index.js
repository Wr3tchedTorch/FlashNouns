const config = require("./utils/config");
const app = require("./app");

app.listen(config.PORT, () => console.log(`server listening on port http://localhost:${config.PORT}`));
