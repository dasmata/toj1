function Observer(){

}

Observer.Target = function (){
    this.targets = new Set();
}

Observer.Target.prototype.attach = function(client){
    this.targets.add(client)
}

Observer.Target.prototype.detach = function(client){
    this.targets.delete(client)
}

Observer.Target.prototype.notify= function(event){
    this.targets.forEach(client => client.notify(event))
}

Observer.Client = function (){}
Observer.Client.prototype.notify = function(event){
    throw new Error('You must implement your own notify')
}
