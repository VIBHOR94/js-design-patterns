const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class HotDrink {
  consume () {}
}

class Tea extends HotDrink {
  consume () {
    console.log('This tea is nice with lemon!')
  }
}

class Coffee extends HotDrink {
  consume () {
    console.log('This coffee is delicious!')
  }
}

class HotDrinkFactory {
  prepare (amount) { /* abstract */ }
}

class TeaFactory extends HotDrinkFactory {
  prepare (amount) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`)
    return new Coffee()
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare (amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`)
    return new Tea()
  }
}

const AvailableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory
})

class HotDrinkMachine {
  constructor () {
    this.factories = {}
    for (const drink in AvailableDrink) {
      this.factories[drink] = new AvailableDrink[drink]()
    }
  }

  makeDrink (type) {
    switch (type) {
      case 'tea':
        return new TeaFactory().prepare(200)
      case 'coffee':
        return new CoffeeFactory().prepare(50)
      default:
        throw new Error(`Don't know how to make ${type}`)
    }
  }

  interact (consumer) {
    rl.question('Please specify drink and amount ' +
      '(e.g., tea 50): ', answer => {
      const parts = answer.split(' ')
      const name = parts[0]
      const amount = parseInt(parts[1])
      const d = this.factories[name].prepare(amount)
      rl.close()
      consumer(d)
    })
  }
}

const machine = new HotDrinkMachine()
machine.interact(
  function (drink) {
    drink.consume()
  }
)
