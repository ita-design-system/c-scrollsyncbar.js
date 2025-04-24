import { EleventyRenderPlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import libdocMessages from "./_data/libdocMessages.json" with { "type": "json" };
import libdocConfig from "./_data/libdocConfig.json" with { "type": "json" };
import libdocUtils from "./_data/libdocUtils.js";
// import { escapeAttribute } from "entities";
// import Image from "@11ty/eleventy-img";

export default function(eleventyConfig) {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// output image formats
		formats: ["svg", "avif", "webp"],
        // useCache: false,

		// output image widths
		widths: [1400],
        svgShortCircuit: true,
        filenameFormat: function (id, src, width, format, options) {
            // Define custom filenames for generated images
            // id: hash of the original image
            // src: original image path
            // width: current width in px
            // format: current file format
            // options: set of options passed to the Image call
            const filename = src.split('/').slice(-1)[0].split('.')[0];

            return `${libdocUtils.slugify(filename)}-${id}-__${width}__.${format}`;
        },
        // transform: (sharp) => {
        //     sharp.trim();
        // },
        sharpOptions: {
            animated: true,
        },

		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {
                class: "eleventy-image"
            }
		}
	});

    eleventyConfig.addAsyncFilter("autoids", async function (content) {
        let i = 0;
        const anchorsIds = [];
        content = content.replace(/<([a-zA-Z][a-zA-Z0-9_-]*)\b[^>]*>(.*?)<\/\1>/g, function(m,m1,m2){
            let newM = m;
            if (libdocConfig.tocHtmlTags.includes(m1)) {
                // Add id to the specified html tags
                let slugifiedId = libdocUtils.slugify(m2);
                if (anchorsIds.includes(slugifiedId)) {
                    slugifiedId += `-${i}`;
                }
                anchorsIds.push(slugifiedId);
                const markup = `
                    <${m1} id="${slugifiedId}" pl-9="xs,sm">
                        <a  href="#${slugifiedId}"
                            title="${m2}"
                            class="pos-absolute top-50 left-0 t-tY-50 | p-4 ml-1 | td-none | brad-4 bc-neutral-100 bwidth-1 bstyle-dashed bcolor-neutral-500 __hover-1"
                            ml-3="xs,sm">
                            <span class="icon-link-simple | pos-absolute top-50 left-50 t-tY-50 t-tX-50 | fs-4"></span>
                        </a>
                `;
                newM = m.replace(`<${m1}>`, markup);
                i++;
            }
            return newM;
        });
		return content;
	});

    eleventyConfig.addAsyncFilter("cleanup", async function (content) {
        content = content.replaceAll(`<table>`, `<div class="o-auto w-100 table-wrapper"><table>`);
        content = content.replaceAll(`</table>`, `</table></div>`);
        content = content.replaceAll(`<p><div`, `<div`);
        content = content.replaceAll(`</div></p>`, `</div>`);
        content = content.replaceAll(`<p><aside`, `<aside`);
        content = content.replaceAll(`</aside></p>`, `</aside>`);
		return content;
	});

    eleventyConfig.addAsyncFilter("dateString", async function (content) {
        const jsDate = new Date();
        let theDay = content.getDate().toString();
        if (theDay.length == 1) theDay = `0${theDay}`;
        let theMonth = (content.getMonth() + 1).toString();
        if (theMonth.length == 1) theMonth = `0${theMonth}`;
        const theYear = content.getFullYear().toString();
        return `${theYear}-${theMonth}-${theDay}`;
        // console.log(`${theYear}-${theMonth}-${theDay}`)
	});

    eleventyConfig.addAsyncFilter("toc", async function (content) {
        const htmlTagsFound = libdocUtils.extractHtmlTagsFromString(content, libdocConfig.tocHtmlTags);
        let tocMarkup = '';
        if (htmlTagsFound.length > libdocConfig.tocMinTags) {
            tocMarkup = `
                <ol class="cgap-3em | m-0 pl-0 pb-5 o-auto | lh-1 | ls-none bwidth-1 bstyle-dashed bcolor-neutral-500 btwidth-0 brwidth-0"
                    d-flex="xs,sm"
                    fd-column="xs,sm"
                    fw-wrap="xs,sm"
                    columns-3="md"
                    columns-2="sm"
                    maxh-300px="sm"
                    maxh-200px="xs">`;
            // Displaying the results
            const anchorsIds = [];
            htmlTagsFound.forEach(function(htmlTag, tagIndex) {
                let slugifiedId = libdocUtils.slugify(htmlTag.value);
                if (anchorsIds.includes(slugifiedId)) {
                    slugifiedId += `-${tagIndex}`;
                }
                anchorsIds.push(slugifiedId);
                tocMarkup += `
                    <li class="d-flex">
                        <a  href="#${slugifiedId}"
                            class="pl-5 pt-1 pb-1 | fs-4 lsp-3 lh-5 fvs-wght-400 | blwidth-1 blstyle-dashed bcolor-neutral-500">
                            ${htmlTag.value}
                        </a>
                    </li>`;
            });
            tocMarkup += '</ol>';
        }
		return tocMarkup;
	});

    eleventyConfig.addPlugin(EleventyRenderPlugin, {
		tagName: "renderTemplate", // Change the renderTemplate shortcode name
		tagNameFile: "renderFile", // Change the renderFile shortcode name
		filterName: "renderContent", // Change the renderContent filter name

		// Only available in Liquid right now
		accessGlobalData: false,   // Does rendered content has access to the data cascade?
	});

    eleventyConfig.addCollection("myTags", function (collectionsApi) {
        const allData = collectionsApi.getAll();
        let finalData = [];
        allData.forEach(function(item) {
            if (typeof item.data.tags == 'object') {
                item.data.tags.forEach(function(tag) {
                    if (!finalData.includes(tag) && tag != 'post') finalData.push(tag);
                })
            }
        });
		return finalData;
	});

    eleventyConfig.addCollection("postsByDateDescending", function (collectionsApi) {
		return collectionsApi.getFilteredByTag("post").sort(function (a, b) {
			//return a.date - b.date; // sort by date - ascending
			return b.date - a.date; // sort by date - descending
			//return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
			//return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
		});
	});

    eleventyConfig.addPairedShortcode("sandbox", async function(content, sandboxTitle) {
        const   code = libdocUtils.HTMLEncode(content.replace(/[\n\r]/, '')),
                title = typeof sandboxTitle == `string` ? sandboxTitle : libdocMessages.sandbox[libdocConfig.lang],
                iframeAttribute = `srcdoc="${code}"`,
                enableSwitchId = libdocUtils.generateRandomId(),
                iframeCommands = `<header class="d-flex jc-space-between | pl-5" style="height: 58px">
                        <div class="d-flex ai-center | fvs-wght-400 fs-3 | c-neutral-500">
                            srcdoc
                        </div>
                    </header>`;
        return libdocUtils.templates.sandbox({iframeAttribute, iframeCommands, title, code, enableSwitchId});
    });

    eleventyConfig.addPairedShortcode("sandboxFile", async function(content, permalink, sandboxTitle) {
        const   code = libdocUtils.HTMLEncode(content),
                iframeAttribute = `src="${permalink}"`,
                title = typeof sandboxTitle == `string` ? sandboxTitle : libdocMessages.sandbox[libdocConfig.lang],
                enableSwitchId = libdocUtils.generateRandomId(),
                iframeCommands = `<header class="d-flex jc-space-between gap-5 | pl-5 pr-5" style="height: 58px">
                        <a  href="${permalink}"
                            target="_blank"
                            title="${libdocMessages.openInANewTab[libdocConfig.lang]}"
                            class="d-flex ai-center gap-1 | p-0 | fvs-wght-400 fs-2 tt-uppercase td-none | sandbox__permalink"
                            fs-2="xs">
                            <span class="fvs-wght-400 | c-neutral-300">${libdocMessages.open[libdocConfig.lang]}</span>
                            <span class="icon-arrow-square-out c-neutral-500"></span>
                        </a>
                        <div class="d-flex gap-5">
                            <button type="button"
                                class="d-flex ai-center | p-0 | fvs-wght-400 fs-2 tt-uppercase | bc-0 c-neutral-300 b-0 cur-pointer | sandbox__reload">
                                <span class="o-hidden | to-ellipsis ws-nowrap">${libdocMessages.reload[libdocConfig.lang]}</span>
                            </button>
                            <button type="button"
                                class="d-flex ai-center | p-0 | fvs-wght-400 fs-2 tt-uppercase | bc-0 c-neutral-300 b-0 cur-pointer | sandbox__copy_url">
                                <span class="o-hidden | to-ellipsis ws-nowrap">${libdocMessages.copyURL[libdocConfig.lang]}</span>
                            </button>
                        </div>
                    </header>`;
        return libdocUtils.templates.sandbox({iframeAttribute, iframeCommands, title, code, enableSwitchId});
    });

    // Copy `css/fonts/` to `_site/css/fonts`
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("sandboxes");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("core/assets");
    eleventyConfig.addPassthroughCopy("favicon.png");
    
    return {
        pathPrefix: libdocConfig.htmlBasePathPrefix
    }
};