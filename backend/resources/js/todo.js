let command = null;

const setTaskCommand = () => command = "- [ ] ";

const getTaskCommand = () => "- [ ] ";

const addTask = () => {
    // コマンドを保存
    setTaskCommand();

//     キャレットの後ろに文字が存在しない(先頭)      : checkを先頭の行に配置する
//     キャレットの後ろに文字が存在する && 
//         文字とキャレットの間にスペースがない場合  : checkをキャレットがある行の先頭に配置
//         &&
//         キャレットが先頭の場合                : bottomに改行
//         キャレットが間にある(先頭ではない)場合: top、bottomに改行

//         文字とキャレットの間にスペースがある場合　: checkをキャレットがある行から一行飛ばして配置

    const textarea_element = document.getElementById("editor_textarea")
    const textarea         = textarea_element.value;

    const position     = textarea_element.selectionStart;
    const length       = textarea.length;
    const before_lines = textarea.substr(0, position);
    const after_lines  = textarea.substr(position, length);
    const split_text   = before_lines.split(/\r\n|\n/);
    const last_line    = split_text.slice(-1)[0];

    // console.log(position)
    // console.log(length)
    // console.log(before_lines)
    // console.log(after_lines)
    // console.log(split_text)
    // console.log(last_line)

    /* キャレットの後ろに文字が存在しない(先頭) */
    //　キャレットの前が1つのみ split_textのlengthが1
    if (split_text.length === 1)
    {
        console.log("先頭")
        /* 1行目かつ先頭の場合 */
        if (!before_lines) {
            console.log("行先頭")
            const result = getTaskCommand();

            textarea_element.value = result;
        }

        /* 1行目かつ先頭ではない場合 */
        if (before_lines) {
            console.log("行先頭でない")
            const result = before_lines + '\n\n' + getTaskCommand();

            textarea_element.value = result;
        }

        /* キャレットを最後尾に指定 */
        textarea_element.focus()
    }
    else
    {
        console.log("先頭でない")
    }
    // if (textarea)
    // {
    //     console.log("textareaに文字がある時の処理")

    //     // Todo
    //     // 空文字 + コマンド
    //     // キャレットがある行を取得
    //     // キャレットの位置が先頭以外の場合
    //     /* 
    //      * キャレットのポジション
    //      * 
    //      *
    //      *
    //      *
    //      */
        

    //     // // before + - [ ] + after
    //     // split_text.splice(-1, 1, getTaskCommand());

    //     // const join    = split_text.join()
    //     // const replace = join.replace(/,/g, '\n')
    //     // const result  = replace + after_lines
        
    //     // document.getElementById("editor_textarea").value = result


    //     // const caret_position = position + getTaskCommand().length
    //     // textarea_element.focus()
    //     // textarea_element.setSelectionRange(caret_position, caret_position)

    //     // onPreventEvent();
    // }

    // /* textareaに文字がない時の処理 */
    // if (!textarea)
    // {
    //     console.log("textareaに文字がない時の処理")
    //     textarea_element.value = textarea + getTaskCommand();
    //     textarea_element.focus()
    // }
}

const textarea_element = document.getElementById("editor_textarea");

/* Enterが押された時の処理 */
// textarea_element.addEventListener('keydown', enter_handle, false);
// const preventEvent    = (e) => e.preventDefault();
// const onPreventEvent  = (e) => textarea_element.addEventListener('keypress', preventEvent, false );
// const offPreventEvent = (e) => textarea_element.removeEventListener('keypress', preventEvent, false );

export {addTask}