export default function handleInputRender(e) {
    let arr = [];
    let val = e.target.value;
    arr.length = val;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = {
        id: i,
        code: "",
        unit: "",
        grade: "",
        aggregate: {
          value: "",
          color: "",
        },
      };
    }
    setInputValues(arr);
  }