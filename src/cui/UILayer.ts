import BaseContainer from "./BaseContainer";

/**
 * fixme: 暂不可用
 */
export default class UILayer extends BaseContainer {

    /** 添加到舞台 */
    protected $onAdd(): void {
        super.$onAdd();

        // 与舞台 同大小
        let width = this.stage.getBounds().width;
        let height = this.stage.getBounds().height;
        this.setBounds( 0, 0, width, height );
        // this.removeAllEventListeners();
    }
}