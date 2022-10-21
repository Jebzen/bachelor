import React from "react";
import { Section } from "./Section";

export function CustomPage(props:any){
    console.log(props);

    return (
        <Section>
            <div className="component">
                <h1>{props.content.title} page</h1>
                <p>Labore magna dolor incididunt ut id deserunt nostrud sint irure et sint sit amet. Adipisicing Lorem sit enim Lorem enim consequat mollit cupidatat sit anim commodo voluptate. Sint ut ipsum excepteur amet sit. Reprehenderit sunt ea amet in. Ullamco do ea laboris proident eiusmod veniam reprehenderit officia voluptate esse commodo enim. Excepteur officia nostrud amet proident fugiat incididunt deserunt est dolor commodo velit amet ipsum.</p>
            </div>
        </Section>
    )
}