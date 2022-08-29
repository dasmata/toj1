"use strict"

class View {
  constructor(el){
    let parent = el.parentNode;
    const template = this.constructor.template;
    Object.defineProperty(this, 'el', {
      value: el,
      configurable: false,
      enumerable: false,
      writable: false
    });
    Object.defineProperty(this, 'parent', {
      get: () => parent,
      set: (newVal) => parent = newVal
    });
    let events = {};
    Object.defineProperty(this, 'events', {
      set: newArray => events = newArray,
      get: () => events,
      enumerable: false
    });
    template && this.setTemplate(template.cloneNode(true));
  }

  detach() {
    this.parent && this.parent.removeChild(this.el)
  }

  destroy() {
    this.detach();
    this.cleanup();
    this.el = null;
  }

  attach(newEl) {
    this.parent = (newEl || this.parent);
    this.parent && this.parent.appendChild(this.el)
  }

  setTemplate(template) {
    this.detach();
    this.el.appendChild(template);
    this.attach();
  }

  render() {
    throw new Error(`No render menthod found for ${this.constructor.name}`)
  }

  addEventListener(query, evt, callback) {
    const evtName = arguments.length === 3 ? evt : query;
    const clbk = arguments.length === 3 ? callback : evt;

    const evtCallback = e => {
      if(arguments.length === 3 && !e.target.matches(query)){
        return;
      }
      clbk(e)
    };
    this.el.addEventListener(evtName, evtCallback);
    (this.events[evtName] ? this.events[evtName] : (this.events[evtName] = [])).push({
      initial: clbk,
      internal: evtCallback
    });
  }

  removeEventListener(evt, callback) {
    Object.keys(this.events).forEach(evt => {
      this.events[evt] = this.events[evt].filter(clbk => {
        if(callback === clbk.initial){
          this.el.removeEventListener(evt, clbk.internal);
        }
        return callback !== clbk.initial
      })
    })
  }

  cleanup() {
    Object.keys(this.events).forEach(evt => {
      this.events[evt].forEach(clbk => {
        this.el.removeEventListener(evt, clbk.internal);
      })
    })
    this.events = {};
  }
}



// static
View.generateTemplate = function(template, parent) {
  template.forEach(tplElement => {
    parent.appendChild(tplElement.el);
    if(Array.isArray(tplElement.children)){
      View.generateTemplate(tplElement.children, tplElement.el)
    }
  })
};
