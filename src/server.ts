import { app } from "./app";
import { environment } from "./utils/env";

const port = environment.port || 3000;

app.listen(port, () => console.log("app started on", port));
