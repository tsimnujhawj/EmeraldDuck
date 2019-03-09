var test = {
    prop: 42,
    func: function() {
      return this.prop;
    },
  };

  test3 = test;
  test3.prop = 9999;
  
  console.log(test3.func());
  // expected output: 42