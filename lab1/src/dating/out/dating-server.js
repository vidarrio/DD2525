function Top (rt) {
  this.libSet = new Set ()
  this.libs = []
  this.addLib = function (lib, decl) { if (!this.libSet.has (lib +'.'+decl)) { this.libSet.add (lib +'.'+decl); this.libs.push ({lib:lib, decl:decl})} }
  this.loadlibs = function (cb) { rt.linkLibs (this.libs, this, cb) }
  this.serializedatoms = "AQAAAAAAAAAA"
  this.gensym8 = function ($env,arg112) {
    const gensym10 = rt.mkCopy(rt.printString);
    const gensym11 = rt.mkValPos ("New profile received",'');;
    rt.tailcall (gensym10,gensym11);
  }
  this.gensym8.deps = [];
  this.gensym8.libdeps = [];
  this.gensym8.serialized = "AAAAAAAAAAAHZ2Vuc3ltOAAAAAAAAAAGYXJnMTEyAAAAAAAAAAIAAAAAAAAAAAhnZW5zeW0xMAYAAAAAAAAAC3ByaW50U3RyaW5nAAAAAAAAAAAIZ2Vuc3ltMTEFAQAAAAAAAAAUTmV3IHByb2ZpbGUgcmVjZWl2ZWQAAAAAAAAAAAAIZ2Vuc3ltMTAAAAAAAAAAAAhnZW5zeW0xMQ==";
  this.gensym5 = function ($env,arg17) {
    const gensym48 = rt.istuple(arg17);
    rt.push ((gensym43) =>
             {rt.branch (gensym43);
              if (rt.getVal(gensym43)) {
                const gensym39 = rt.mkValPos (0,'RTGen<CaseElimination>');;
                const gensym38 = rt.index (arg17,gensym39);;
                const gensym37 = rt.istuple(gensym38);
                rt.push ((gensym30) =>
                         {rt.branch (gensym30);
                          if (rt.getVal(gensym30)) {
                            const gensym26 = rt.mkValPos (0,'RTGen<CaseElimination>');;
                            const gensym24 = rt.index (arg17,gensym26);;
                            const gensym25 = rt.mkValPos (0,'RTGen<CaseElimination>');;
                            const gensym22 = rt.index (gensym24,gensym25);;
                            const gensym23 = rt.mkValPos ("NEWPROFILE",'');;
                            const gensym21 = rt.eq (gensym22,gensym23);;
                            rt.branch (gensym21);
                            if (rt.getVal(gensym21)) {
                              const gensym7 = rt.mkValPos (0,'RTGen<CaseElimination>');;
                              const $$$env0 = new rt.Env();
                              const gensym8 = rt.mkVal(new rt.Closure($$$env0, this, this.gensym8))
                              $$$env0.gensym8 = gensym8;
                              $$$env0.gensym8.selfpointer = true;
                              const gensym9 = rt.mkVal(rt.mkTuple([gensym7, gensym8]));
                              rt.ret (gensym9);
                            } else {
                              const gensym18 = rt.mkValPos (1,'RTGen<CaseElimination>');;
                              const gensym19 = rt.__unit;
                              const gensym20 = rt.mkVal(rt.mkTuple([gensym18, gensym19]));
                              rt.ret (gensym20);
                            }
                          } else {
                            const gensym27 = rt.mkValPos (1,'RTGen<CaseElimination>');;
                            const gensym28 = rt.__unit;
                            const gensym29 = rt.mkVal(rt.mkTuple([gensym27, gensym28]));
                            rt.ret (gensym29);
                          }});
                rt.branch (gensym37);
                if (rt.getVal(gensym37)) {
                  const gensym35 = rt.mkValPos (0,'RTGen<CaseElimination>');;
                  const gensym34 = rt.index (arg17,gensym35);;
                  const gensym32 = rt.length(gensym34);
                  const gensym33 = rt.mkValPos (2,'RTGen<CaseElimination>');;
                  const gensym31 = rt.eq (gensym32,gensym33);;
                  rt.ret (gensym31);
                } else {
                  const gensym36 = rt.mkValPos (false,'');;
                  rt.ret (gensym36);
                }
              } else {
                const gensym40 = rt.mkValPos (1,'RTGen<CaseElimination>');;
                const gensym41 = rt.__unit;
                const gensym42 = rt.mkVal(rt.mkTuple([gensym40, gensym41]));
                rt.ret (gensym42);
              }});
    rt.branch (gensym48);
    if (rt.getVal(gensym48)) {
      const gensym45 = rt.length(arg17);
      const gensym46 = rt.mkValPos (2,'RTGen<CaseElimination>');;
      const gensym44 = rt.eq (gensym45,gensym46);;
      rt.ret (gensym44);
    } else {
      const gensym47 = rt.mkValPos (false,'');;
      rt.ret (gensym47);
    }
  }
  this.gensym5.deps = ['gensym8'];
  this.gensym5.libdeps = [];
  this.gensym5.serialized = "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";
  this.server2 = function ($env,server_arg13) {
    const gensym52 = rt.__unit;
    const gensym49 = rt.eq (server_arg13,gensym52);;
    const gensym50 = rt.mkValPos ("pattern match failure in function server",'');;
    rt.assertOrError (gensym49);
    if (rt.getVal(gensym49)) {
      rt.push (($decltemp$6) =>
               {const gensym3 = rt.__unit;
                rt.tailcall ($env.server2,gensym3);});
      const gensym4 = rt.mkCopy(rt.receive);
      const $$$env1 = new rt.Env();
      const gensym5 = rt.mkVal(new rt.Closure($$$env1, this, this.gensym5))
      $$$env1.gensym5 = gensym5;
      $$$env1.gensym5.selfpointer = true;
      const gensym6 = rt.mkVal(rt.mkList([gensym5]));
      rt.tailcall (gensym4,gensym6);
    } else {
      rt.errorPos (gensym50,':5:9');
    }
  }
  this.server2.deps = ['gensym5'];
  this.server2.libdeps = [];
  this.server2.serialized = "AAAAAAAAAAAHc2VydmVyMgAAAAAAAAAMc2VydmVyX2FyZzEzAAAAAAAAAAMAAAAAAAAAAAhnZW5zeW01MgUDAAAAAAAAAAAIZ2Vuc3ltNDkABQAAAAAAAAAADHNlcnZlcl9hcmcxMwAAAAAAAAAACGdlbnN5bTUyAAAAAAAAAAAIZ2Vuc3ltNTAFAQAAAAAAAAAocGF0dGVybiBtYXRjaCBmYWlsdXJlIGluIGZ1bmN0aW9uIHNlcnZlcgMAAAAAAAAAAAhnZW5zeW00OQAAAAAAAAAABgAAAAAAAAALJGRlY2x0ZW1wJDYAAAAAAAAAAwAAAAAAAAAAB2dlbnN5bTQGAAAAAAAAAAdyZWNlaXZlAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAB2dlbnN5bTUAAAAAAAAAB2dlbnN5bTUAAAAAAAAAAAdnZW5zeW02AwAAAAAAAAABAAAAAAAAAAAHZ2Vuc3ltNQAAAAAAAAAAAAdnZW5zeW00AAAAAAAAAAAHZ2Vuc3ltNgAAAAAAAAABAAAAAAAAAAAHZ2Vuc3ltMwUDAAEAAAAAAAAAB3NlcnZlcjIAAAAAAAAAAAdnZW5zeW0zAAAAAAAAAAAIZ2Vuc3ltNTAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAJ";
  this.main = function ($env,$$authorityarg) {
    const gensym90 = $$authorityarg;
    const $$$env2 = new rt.Env();
    const server2 = rt.mkVal(new rt.Closure($$$env2, this, this.server2))
    $$$env2.server2 = server2;
    $$$env2.server2.selfpointer = true;
    const gensym89 = rt.__unit;
    rt.push ((gensym88) =>
             {rt.ret (gensym88);});
    const gensym79 = rt.__unit;
    const gensym76 = rt.eq (gensym89,gensym79);;
    const gensym77 = rt.mkValPos ("pattern match failure in function main",'');;
    rt.assertOrError (gensym76);
    if (rt.getVal(gensym76)) {
      rt.push (($decltemp$22) =>
               {rt.push (($decltemp$24) =>
                         {rt.push (($decltemp$26) =>
                                   {const gensym63 = rt.__unit;
                                    rt.ret (gensym63);});
                          const gensym64 = rt.mkCopy(rt.register);
                          const gensym65 = rt.mkValPos ("datingServer",'');;
                          const gensym68 = rt.mkCopy(rt.spawn);
                          rt.push ((gensym66) =>
                                   {const gensym67 = rt.mkVal(rt.mkTuple([gensym65, gensym66, gensym90]));
                                    rt.tailcall (gensym64,gensym67);});
                          rt.tailcall (gensym68,server2);});
                const gensym69 = rt.mkCopy(rt.printString);
                const gensym71 = rt.mkValPos ("Running node with identifier: ",'');;
                const gensym70 = rt.stringConcat (gensym71,$decltemp$22);;
                rt.tailcall (gensym69,gensym70);});
      const gensym72 = rt.mkCopy(rt.node);
      const gensym74 = rt.mkCopy(rt.self);
      const gensym75 = rt.__unit;
      rt.push ((gensym73) =>
               {rt.tailcall (gensym72,gensym73);});
      rt.tailcall (gensym74,gensym75);
    } else {
      rt.errorPos (gensym77,':19:9');
    }
  }
  this.main.deps = ['server2'];
  this.main.libdeps = [];
  this.main.serialized = "AAAAAAAAAAAEbWFpbgAAAAAAAAAOJCRhdXRob3JpdHlhcmcAAAAAAAAAAwAAAAAAAAAACGdlbnN5bTkwBgAAAAAAAAAOJCRhdXRob3JpdHlhcmcBAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAHc2VydmVyMgAAAAAAAAAHc2VydmVyMgAAAAAAAAAACGdlbnN5bTg5BQMGAAAAAAAAAAhnZW5zeW04OAAAAAAAAAADAAAAAAAAAAAIZ2Vuc3ltNzkFAwAAAAAAAAAACGdlbnN5bTc2AAUAAAAAAAAAAAhnZW5zeW04OQAAAAAAAAAACGdlbnN5bTc5AAAAAAAAAAAIZ2Vuc3ltNzcFAQAAAAAAAAAmcGF0dGVybiBtYXRjaCBmYWlsdXJlIGluIGZ1bmN0aW9uIG1haW4DAAAAAAAAAAAIZ2Vuc3ltNzYAAAAAAAAAAAYAAAAAAAAADCRkZWNsdGVtcCQyMgAAAAAAAAADAAAAAAAAAAAIZ2Vuc3ltNzIGAAAAAAAAAARub2RlAAAAAAAAAAAIZ2Vuc3ltNzQGAAAAAAAAAARzZWxmAAAAAAAAAAAIZ2Vuc3ltNzUFAwYAAAAAAAAACGdlbnN5bTczAAAAAAAAAAAAAAAAAAAAAAAIZ2Vuc3ltNzQAAAAAAAAAAAhnZW5zeW03NQAAAAAAAAAAAAAAAAAAAAAACGdlbnN5bTcyAAAAAAAAAAAIZ2Vuc3ltNzMAAAAAAAAAAAYAAAAAAAAADCRkZWNsdGVtcCQyNAAAAAAAAAADAAAAAAAAAAAIZ2Vuc3ltNjkGAAAAAAAAAAtwcmludFN0cmluZwAAAAAAAAAACGdlbnN5bTcxBQEAAAAAAAAAHlJ1bm5pbmcgbm9kZSB3aXRoIGlkZW50aWZpZXI6IAAAAAAAAAAACGdlbnN5bTcwABAAAAAAAAAAAAhnZW5zeW03MQAAAAAAAAAADCRkZWNsdGVtcCQyMgAAAAAAAAAAAAhnZW5zeW02OQAAAAAAAAAACGdlbnN5bTcwAAAAAAAAAAAGAAAAAAAAAAwkZGVjbHRlbXAkMjYAAAAAAAAAAwAAAAAAAAAACGdlbnN5bTY0BgAAAAAAAAAIcmVnaXN0ZXIAAAAAAAAAAAhnZW5zeW02NQUBAAAAAAAAAAxkYXRpbmdTZXJ2ZXIAAAAAAAAAAAhnZW5zeW02OAYAAAAAAAAABXNwYXduBgAAAAAAAAAIZ2Vuc3ltNjYAAAAAAAAAAAAAAAAAAAAAAAhnZW5zeW02OAAAAAAAAAAAB3NlcnZlcjIAAAAAAAAAAQAAAAAAAAAACGdlbnN5bTY3AgAAAAAAAAADAAAAAAAAAAAIZ2Vuc3ltNjUAAAAAAAAAAAhnZW5zeW02NgAAAAAAAAAACGdlbnN5bTkwAAAAAAAAAAAACGdlbnN5bTY0AAAAAAAAAAAIZ2Vuc3ltNjcAAAAAAAAAAQAAAAAAAAAACGdlbnN5bTYzBQMBAAAAAAAAAAAIZ2Vuc3ltNjMAAAAAAAAAAAhnZW5zeW03NwAAAAAAAAAAAAAAAAAAAAATAAAAAAAAAAkAAAAAAAAAAAEAAAAAAAAAAAhnZW5zeW04OA==";
}
module.exports = Top 