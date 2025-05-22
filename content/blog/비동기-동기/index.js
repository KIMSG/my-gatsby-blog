//예제1
console.log(1);

setTimeout(() => {
    console.log(2);
}, 0);

setTimeout(() => {
    console.log(3);
}, 100);

console.log(4);
/**
 * 
 1
4
2
3
 */


//예제2
function bar(){
    console.log('bar');
}

function baz(){
    console.log('baz');
}

function foo(){
    console.log('foo');
    bar();
    baz();
}
foo();

/**
 * foo
bar
baz
 */