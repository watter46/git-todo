/* コマンドの保存 */
let command = null;

const setTaskCommand = () => command = "- [ ] ";

const getTaskCommand = () => "- [ ] ";

export const addTask = () => {
    // コマンドを保存
    setTaskCommand();

    const textarea_element = document.getElementById("editor_textarea")
    const textarea   = textarea_element.value;

    // Todo: 行の間にtaskcommandを入力する処理を書く
    if (textarea)
    {
        console.log("true")

        const position     = textarea_element.selectionStart;
        const length       = textarea.length;
        const before_lines = textarea.substr(0, position);
        const after_lines  = textarea.substr(position, length);
        const split_text   = before_lines.split(/\r\n|\n/);
        const last_line    = split_text.slice(-1)[0];

        console.log(position)
        console.log(length)
        console.log(before_lines)
        console.log(after_lines)
        console.log(split_text)
        console.log(last_line)

        // before + - [ ] + after
        split_text.splice(-1, 1, getTaskCommand());

        const join    = split_text.join()
        const replace = join.replace(/,/g, '\n')
        const result  = replace + after_lines
        
        document.getElementById("editor_textarea").value = result


        const caret_position = position + getTaskCommand().length
        textarea_element.focus()
        textarea_element.setSelectionRange(caret_position, caret_position)

        onPreventEvent();
    }

    /* textareaに文字がないとき */
    if (!textarea)
    {
        console.log("false")
        textarea_element.value = textarea + getTaskCommand();
        textarea_element.focus()
    }
}

const enter_handle = (e) => {
    // キー入力を有効にする
    offPreventEvent();

    if (e.code === "Enter" && e.ctrlKey) {
        console.log("ctrl + enter")
        addTask()
        return;
    }

    /* Enter以外を押すとコマンドを解除する */
    if (!(e.code === "Enter")) command = null;

    /* Enterを入力したときの処理 */
    if (e.code === "Enter")
    {
        console.log("Enterを入力したときの処理")
        const textarea_element = document.getElementById("editor_textarea");

        const textarea = textarea_element.value;

        const position     = textarea_element.selectionStart;
        const length       = textarea.length;
        const before_lines = textarea.substr(0, position);
        const after_lines  = textarea.substr(position, length);
        const split_text   = before_lines.split(/\r\n|\n/);
        const last_line    = split_text.slice(-1)[0];


        /* キャレットの前にコマンドが含まれていない時の処理 */
        if (!(last_line === getTaskCommand())) {
            console.log("キャレットの前にコマンドが含まれていない時の処理")

            // 先頭にコマンドがある時の処理
            if (last_line.substr(0, 6) === getTaskCommand())
            {
                console.log("先頭にコマンドがある時の処理")
                addTask()
                onPreventEvent()
            }
        }


        // 最終行がコマンドのみの場合の処理
        if (last_line === getTaskCommand())
        {
            // テキストエリアにコマンド以外もある場合
            if (!(textarea === last_line))
            {
                console.log(split_text)
                split_text.pop();
                console.log(split_text)
                // textarea_split.pop()
                const join    = split_text.join()
                const replace = join.replace(/,/g, '\n')
                const result  = replace + '\n' + after_lines

                document.getElementById("editor_textarea").value = result;

                const caret_position = position - getTaskCommand().length
                textarea_element.setSelectionRange(caret_position, caret_position)

                // Enterキーを無効にして改行させない コマンドのみなので削除
                onPreventEvent();
            }
            // テキストエリアにコマンドのみの場合
            if (textarea === last_line)
            {
                console.log("削除: textarea === last_line")
                document.getElementById("editor_textarea").value = '';

                // Enterキーを無効にして改行させない コマンドのみなので削除
                onPreventEvent();
            }
        }
    }
}

const textarea_element = document.getElementById("editor_textarea");

/* Enterが押された時の処理 */
textarea_element.addEventListener('keydown', enter_handle, false);
const preventEvent    = (e) => e.preventDefault();
const onPreventEvent  = (e) => textarea_element.addEventListener('keypress', preventEvent, false );
const offPreventEvent = (e) => textarea_element.removeEventListener('keypress', preventEvent, false );