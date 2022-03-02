import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { Languages, TextResource } from "../../app/types";
import { Component } from "../../generated/typescript-schema/layout-inheritanceFixes";

export interface ComponentExtended {
  component: Component;
  boundResource: { [key: string]: string };
}

export function useEditorSelector(page?: string) {
  const root = useAppSelector((state) => state.repo?.current, shallowEqual);
  return root?.layouts[
    page?.toLowerCase() ?? ""
  ]?.data?.layout?.map<ComponentExtended>((component) => ({
    component: component,
    boundResource: ObjectMap(
      component.textResourceBindings ?? {},
      (_, id) =>
        root.resources.nb?.resources.find((r) => r.id === id)?.value ?? ""
    ),
  }));
}

export function useComponentSelector(
  page?: string,
  componentId?: string
): ComponentExtended | undefined {
  return (
    useAppSelector((state) => {
      if (!page || !componentId) return undefined;
      const root = state.repo?.current;
      const component = root?.layouts[
        page?.toLowerCase() ?? ""
      ]?.data?.layout?.find((c) => c.id === componentId);
      if (component)
        return {
          component: component,
          boundResource: ObjectMap(
            component.textResourceBindings ?? {},
            (_, id) =>
              root?.resources?.nb?.resources?.find((r) => r.id === id)?.value ??
              ""
          ),
        };
    }, shallowEqual) || undefined
  );
}

export function usePageSelector() {
  return useAppSelector((state) => state.repo.current?.settings.pages?.order);
}

export function useTextResourceSelector(
  textResourceKey: string,
  language: Languages
): TextResource{
  return useAppSelector(
    (state) =>
      ObjectMap(state.repo.current?.resources, (_, resources) =>
        resources.resources.find((tr) => tr.id === textResourceKey)
      )?.[language] 
  ) ?? {id: textResourceKey, value: ""};
}

function ObjectMap<I, O>(
  o: { [key: string]: I } | undefined,
  mapFun: (key: string, value: I) => O
): { [key: string]: O } {
  if (!o) return {};
  return Object.keys(o).reduce((result, key) => {
    result[key] = mapFun(key, o[key]);
    return result;
  }, {} as { [key: string]: O });
}
