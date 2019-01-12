let template =function(c){
  return `describe("${c.name}",function(){
    beforeEach(function(){
      tuple=${JSON.stringify(c.tuple,null,1)};
    });

    it("pass-cases",function(){
      let machine = new ${c.type.toUpperCase()}(tuple);
      ${c["pass-cases"].map((c)=>`assert.isOk(machine.doesAccept('${c}'));\n`).join("")}
    })
    it("fail-cases",function(){
      let machine = new ${c.type.toUpperCase()}(tuple);
      ${c["fail-cases"].map((c)=>`assert.isNotOk(machine.doesAccept('${c}'));\n`).join("")}
    })
});
`
}

module.exports= template;
