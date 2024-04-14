import syncModels from "./databases/initDB";

require("dotenv/config");
require("regenerator-runtime");

import { app } from "./utils";

const PORT: string | number = process.env.PORT || 3000;


const server = app.listen(PORT, () => console.info(`Server running on port http://localhost:${PORT}`));
syncModels()

export default server;

