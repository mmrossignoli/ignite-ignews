// Code generated by prismic-ts-codegen. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for Publication documents */
interface PublicationDocumentData {
    /**
     * Title field in *Publication*
     *
     * - **Field Type**: Title
     * - **Placeholder**: *None*
     * - **API ID Path**: publication.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Content field in *Publication*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: publication.content
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    content: prismicT.RichTextField;
    /**
     * Slice Zone field in *Publication*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: publication.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<PublicationDocumentDataSlicesSlice>;
}
/**
 * Slice for *Publication → Slice Zone*
 *
 */
type PublicationDocumentDataSlicesSlice = PostsSlice;
/**
 * Publication document from Prismic
 *
 * - **API ID**: `publication`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PublicationDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<PublicationDocumentData>, "publication", Lang>;
export type AllDocumentTypes = PublicationDocument;
/**
 * Primary content in Posts → Primary
 *
 */
interface PostsSliceDefaultPrimary {
    /**
     * Title field in *Posts → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: posts.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *Posts → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: posts.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
    /**
     * Content field in *Posts → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: posts.primary.content
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    content: prismicT.RichTextField;
}
/**
 * Default variation for Posts Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Posts`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type PostsSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<PostsSliceDefaultPrimary>, never>;
/**
 * Slice variation for *Posts*
 *
 */
type PostsSliceVariation = PostsSliceDefault;
/**
 * Posts Shared Slice
 *
 * - **API ID**: `posts`
 * - **Description**: `Posts`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type PostsSlice = prismicT.SharedSlice<"posts", PostsSliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
}
