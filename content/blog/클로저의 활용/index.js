/**
 * 1.4 클로저 입문하기 
 * 
 * counter 변수를 전역(global)으로 두지 않고.. 
 * increase와 decrease를 두어서 제한적으로 사용하게 만들었음.
 */


function Counter() {
    var counter = 0;

    return {
        increase: function () {
            return ++counter;
        },
        decrease: function () {
            return --counter;
        },
        counter: function () {
            console.log("counter에 접근");
            return counter;
        },
    }
}

var c = Counter()

console.log(c.increase());
console.log(c.increase());
console.log(c.increase());
console.log(c.decrease());
console.log(c.counter());   // 2

// 예제 끝

/**
 * 클로저를 활용해보기
 */

// 일반적인 함수
const aButton = document.getElementById('a');

function heavyJob() {
  const longArr = Array.from({ length: 100000000 }, (_, i) => i + 1);
  console.log(longArr.length);
}

aButton.addEventListener('click', heavyJob);

//////////////////////////////////////////////////////////////////////

const Button = document.getElementById('a');

function heavyJob() {
  const longArr = Array.from({ length: 100000000 }, (_, i) => i + 1);
  return function (){
      console.log(longArr.length);

  }
}

Button.addEventListener('click', () => {
    const init = heavyJob();
    /**
     * 제가 처음 이해한 클로저였는데, 이렇게 하면 클로저를 활용하지 못 한 예제 입니다.
     * 왜냐하면 Button이 실행할 때 마다 const init이 실행이 되기 때문에
     * 클로저를 활용한 함수가 계속 새롭게 호출이 된다는 의미 입니다.
     * 그래서 이 다음 단계로  const init = heavyJob(); 을 전역에서 호출하고.
     * Button을 클릭할 때 마다 init을 함수로써 호출해 주는 것입니다. 
     * 그렇게 완성한 코드는 아래와 같습니다.
     *  */ 

});

//////////////////////////////////////////////////////////////////////

// 일반적인 함수에 클로저를 적용
const bButton = document.getElementById('a');

function heavyJobWithClosure() {
  const longArr = Array.from({ length: 100000000 }, (_, i) => i + 1);
  return function() {
      console.log(longArr.length);
    //클로저의 핵심: longArr에 계속 접근 가능
  }
}

const innerFunc = heavyJobWithClosure(); // 한 번만 도시락 만듦
/**
 * 배열을 한 번만 만들고
 * 그 배열에 접근할 수 있는 **함수(클로저)**를 반환합니다.
 * */

bButton.addEventListener('click', () => {
  innerFunc(); // 도시락 재활용
});
