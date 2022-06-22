import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* categorySaga() {
    yield takeLatest('CATEGORIES', categories)
}

function* categories(action) {
    console.log("in add categories saga", action.payload.categories);

    // 'something' takes the name of the category and changes it to their corresponding id
    let something = []
    for (let cat of action.payload.categories){
        if (cat === "Speed"){
            something.push(1)
        }else if (cat === "Long"){
            something.push(2)
        }else if (cat === "Fun"){
            something.push(3)
        }else if (cat === "Casual/Social"){
            something.push(4)
        }else if (cat === "Race"){
            something.push(5)
        }
        console.log("this is something: ", something);

    }
    try{//issue here unknown
        yield axios.post("/api/runs/cat", something )
    }catch{
        (error) => console.log("error in categories saga", error);
    }
}

export default categorySaga;