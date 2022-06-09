'use strict';
function mainCtrl(a) {
  function b(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }
  function c(a, b) {
    var c = Number(a) * ((b % 2) + 1);
    return c > 9 ? (c -= 9) : c;
  }
  function d() {
    for (var a, d = '', e = 0, f = 0; 8 > f; f++)
      (a = b(2 > f ? 2 : 0, 2 > f ? 3 : 9)),
        (d += a.toString()),
        (e += c(a, f));
    return d + (10 - (e % 10)).toString();
  }
  function e(a) {
    var b = String(a);
    if (9 != b.length || isNaN(b)) return !1;
    for (var c, d = 0, e = 0; 9 > e; e++)
      (c = Number(b.charAt(e))),
        (c *= (e % 2) + 1),
        c > 9 && (c -= 9),
        (d += c);
    return d % 10 === 0;
  }
  (a.iid = null),
    (a.checkStatus = null),
    (a.generate = function () {
      for (a.checkStatus = !1; !a.checkStatus; )
        (a.iid = d()), (a.checkStatus = e(a.iid));
    }),
    (a.check = function () {
      a.checkStatus = e(a.iid);
    });
}
angular.module('iid', ['iid.mainCtrl']),
  angular.module('iid.mainCtrl', []).controller('mainCtrl', mainCtrl),
  (mainCtrl.$inject = ['$scope']);
