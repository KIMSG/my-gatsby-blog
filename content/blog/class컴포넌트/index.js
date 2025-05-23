import { Component } from 'react'

// 빈 Props 선언
type Props = Record<string, never>

interface State {
count: number
}

class SampleComponent extends Component<Props, State> {
private constructor(props: Props) {
super(props)
this.state = {
count: 1,
}

    // handleClick의 this를 현재 클래스 인스턴스로 바인딩
    this.handleClick = this.handleClick.bind(this)

}

private handleClick() {
this.setState((prev) => ({ count: prev.count + 1 }))
}

public render() {
const {
state: { count },
} = this

    return (
      <div>
        <button onClick={this.handleClick}>증가</button>
        {count}
      </div>
    )

}
}

