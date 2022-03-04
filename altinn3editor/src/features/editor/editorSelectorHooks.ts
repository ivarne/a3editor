import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { Languages, RepoRoot, TextResource } from "../../redux/types";
import { Component } from "../../generated/typescript-schema/layout-inheritanceFixes";

export interface ComponentExtended {
  component: Component;
  boundResource: { [key: string]: string };
}

function getPageIndex(root:RepoRoot, page?: string){

  return root.settings.pages?.order?.findIndex(
    (p) => p.toLowerCase() === page?.toLowerCase()
  );
}

export function useEditorSelector(page?: string) {
  const root = useAppSelector((state) => state.currentRepo, shallowEqual);
  const pageIndex = getPageIndex(root, page) ?? -1;
  return root?.layouts[pageIndex]?.data?.layout?.map<ComponentExtended>(
    (component) => ({
      component: component,
      boundResource: ObjectMap(
        component.textResourceBindings ?? {},
        (_, id) =>
          root.resources.nb?.resources.find((r) => r.id === id)?.value ?? ""
      ),
    })
  );
}

export function useComponentSelector(
  page?: string,
  componentId?: string
): ComponentExtended | undefined {
  return (
    useAppSelector((state) => {
      if (!page || !componentId) return undefined;
      const root = state.currentRepo;
      const component = root?.layouts[
        getPageIndex(root, page) ?? -1
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
  return useAppSelector((state) => state.currentRepo?.settings.pages?.order);
}

export function useTextResourceSelector(
  textResourceKey: string,
  language: Languages
): TextResource {
  return (
    useAppSelector(
      (state) =>
        ObjectMap(state.currentRepo?.resources, (_, resources) =>
          resources.resources.find((tr) => tr.id === textResourceKey)
        )?.[language]
    ) ?? { id: textResourceKey, value: "" }
  );
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
