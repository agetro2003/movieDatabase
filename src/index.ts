import app from "./app";
// mongodb+srv://jesusdaniolob:29891702@cluster0.rizwiq2.mongodb.net/?retryWrites=true&w=majority
app.listen(app.get('port'));
console.log(`Server on port ${app.get('port')}`);