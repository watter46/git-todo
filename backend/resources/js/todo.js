export class Todo {
    #_option = null;

    get option() {
        return this.#_option
    }

     // オプションを追加時に改行したらそのオプションになる
    addTask = () => {
        console.log("addTask")
        this._option = "- [ ] ";
        this.addList();
    }

    addBulletedList = () => {
        this._option = "- ";
        this.addList();
    }

    addList = () => {
        target = document.getElementById("editor_textarea");

        if (target.value)
        {
            target.value = target.value + '\n' + this._option;

            this.setCoursor(target);
        }

        /* textareaに文字がないとき */
        if (!target.value)
        {
            target.value = target.value + this._option;

            this.setCoursor(target);
        }
    }

    setCoursor = (target) =>  {
        target.focus();
    }

    keydown_addTaskList = (event) => {
        /* CtrlキーとBacketRight("[")同時押し */
        if (event.code === "BracketRight" && event.ctrlKey)
        {
            todo.addTaskList();
        }
    }

    //　Todo: enter押したら一列下の行で複製する
    keydown_addBulletedList = (event) => {
        /* CtrlキーとMinus("-")同時押し */
        if (event.code === "Minus" && event.ctrlKey)
        {
            todo.addBulletedList();
        }
    }

    // 改行した時に、前の行を確認して、optionのみの記述だったら削除する
   
    
    // lineCheck = () => {
    //     target = document.getElementById("editor_textarea");
    //     const lastLine = target.value.split(/\r\n|\n/).pop();

    //     if (lastLine === " - [ ] " || lastLine === " - ")
    //     {
    //         console.log("最終")
    //         const text = target.value.split(/\r\n|\n/)
    //         text.pop();
    //         target.value = text

    //         console.log(target.value)
    //         console.log(text)
    //     }
    // }

    // keydown_checkLine = (event) => {
    //     if (event.code === "Enter" && this._option)
    //     {
    //         if (this._option === " - [ ] ")
    //         {
    //             this.lineCheck();
    //             this.addTaskList();
    //         }
    //         if (this._option === " - "    ) this.addBulletedList();
    //     }
    //     // if (event.code === "Enter")
    //     // {
    //     //     this.lineCheck();
    //     // }
    // }

     // keydown enterで判定する
     // optionの前の文字は空白だとoption判定する

    keydown_checkLine = () => {
        if (event.code === "Enter")
        {
            const text = document.getElementById("editor_textarea").value;
            const split = text.split(/\r\n|\n/);
            console.log(split)
            const last = split.pop();
            console.log(last)
            if (last === "- [ ] " || lastLine === "- ")
            {
                console.log("seikou ")
            }
        }
    }

    onPost = () => {
        console.log("onpost");
        target = document.getElementById("editor_textarea");
        console.log(target.value);
    }

    keydown_onPost = () => {
        if (event.code === "Enter" && event.ctrlKey)
        {
            this.onPost();
        }
    }
}