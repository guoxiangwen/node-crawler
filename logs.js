class Test {
    fuck() {
        console.log('fuck you')
    }
    shit() {
        this.fuck()
    }
}
let t = new Test()
t.shit()