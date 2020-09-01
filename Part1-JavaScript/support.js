class Container {
    static of(value){
        return new Container(value)
    }
    constructor(value){
        this._value = value
    }
    map(fn){
        return Container.of(fn(this._value))
    }
    

}

class Maybe{
    static of(x){
        return new Maybe(x)
    }
    isNothing(){
        return this._value === null ||
        this._value ===undefined
    }
    constructor(value){
        this._value = value
    }

    map(fn){
        // console.log(this._value);
        // console.log(fn);
        // console.log(fn(this._value));
        return this.isNothing()? this :
        Maybe.of(fn(this._value))
    }
}
module.exports = {Maybe,Container}
