import validator from 'validator';

function check(value) {
    if (value === undefined || value === null) {
        return true;
    } else if (String(value).length < 1) {
        return true;
    } else if (validator.isEmpty(String(value))) {
        return true;
    } else return false;
}

const validate = (data) => {
    let errors = {};

    let passwordErrorFlag = 0;

    const { user_id, password } = data;

    if (check(user_id)) errors.user_id = '아이디는 필수 입력 사항입니다';

    if (check(password)) {
      errors.password = '비밀번호는 필수 입력 사항입니다';  
      passwordErrorFlag = 1;
    } 

    // if(passwordErrorFlag == 0) {
    //     const passwordRegexExp = /^(?=.*[a-zA-Z])(?=.*[\d])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}$/;
    //     if(!passwordRegexExp.test(password)){
    //         errors.password = '영문/숫자 포함 6~15자 이내';        
    //     }
    // }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export { validate };
