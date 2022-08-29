class Observer{

}

Observer.Target = Parent => class extends Parent {
    constructor(){
        super()
        this.targets = new Set();
    }

    attach (client) {
        this.targets.add(client)
    }

    detach (client) {
        this.targets.delete(client)
    }

    notify (event) {
        this.targets.forEach(client => client.notify(event))
    }
}


Observer.Client = Parent => class extends Parent {
    notify (event){
        throw new Error('You must implement your own notify')
    }
}
