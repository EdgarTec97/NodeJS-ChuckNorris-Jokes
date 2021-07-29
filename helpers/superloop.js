class Superlooper {

    constructor (data, perPage = 3) {
      if (!data) throw new Error('I need an Array to work dude!')
      if (!(data instanceof Array)) throw new Error('Invalid data type. Expected an Array')
  
      this.data = data
      this.num = perPage
      this.index = 0
      this.len = this.data.length
    }
  
    page (direction) {
      this.index = this.index + direction
      let res = []
      for (let i = 0; i < this.num; i++) {
        let aux = this.index + i
        aux = this.normalize(aux)
        res.push(this.data[aux])
      }
      return res;
    }
  
    normalize (i) {
      switch (Math.sign(i % this.len)) {
        case  1:
          return i % this.len
          break
        case -1:
          return this.len + i % this.len
          break
        default:
          return 0
          break
      }
    }
  
  
    initialize () { 
        return this.page(0);
    } 
    next () { 
        return this.page(1);
    }
    prev () { 
        return this.page(-1); 
    }
    goTo (index) { 
        return this.page(this.normalize(index - this.index));
    } 
  
  }
  
module.exports = Superlooper;