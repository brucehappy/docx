import { IgnoreIfEmptyXmlComponent } from "file/xml-components";

import { ITableShadingAttributesProperties, TableShading } from "../shading";
import { WidthType } from "../table-cell";
import { TableBorders } from "./table-borders";
import { TableCellMargin } from "./table-cell-margin";
import { ITableFloatOptions, TableFloatProperties } from "./table-float-properties";
import { TableLayout, TableLayoutType } from "./table-layout";
import { PreferredTableWidth } from "./table-width";

export class TableProperties extends IgnoreIfEmptyXmlComponent {
    private readonly cellMargin: TableCellMargin;
    private readonly border: TableBorders;

    constructor() {
        super("w:tblPr");

        // Borders must appear in the tblPr before cell margins
        // in order for them to be applied properly in Word Online
        this.border = new TableBorders();
        this.root.push(this.border);

        this.cellMargin = new TableCellMargin();
        this.root.push(this.cellMargin);
    }

    public setWidth(width: number, type: WidthType = WidthType.AUTO): TableProperties {
        this.root.push(new PreferredTableWidth(type, width));
        return this;
    }

    public setLayout(type: TableLayoutType): void {
        this.root.push(new TableLayout(type));
    }

    public get Border(): TableBorders {
        return this.border;
    }

    public get CellMargin(): TableCellMargin {
        return this.cellMargin;
    }

    public setTableFloatProperties(tableFloatOptions: ITableFloatOptions): TableProperties {
        this.root.push(new TableFloatProperties(tableFloatOptions));
        return this;
    }

    public setShading(attrs: ITableShadingAttributesProperties): TableProperties {
        this.root.push(new TableShading(attrs));

        return this;
    }
}
