import {Component, Vue, Watch} from 'vue-property-decorator';
import {JsonDoc, JsonDocKinds} from '@objects/faces/jsdocjson';
import {DocumentationService} from '@services/documentation';
import {docsFind} from '@helpers/docs-find';


@Component export default class WatchDocNameParam extends Vue {
  membersOf: {[p: string]: JsonDoc[]}|null = null;
  owner: JsonDoc|null = null;

  setMemberOfObjectTo(name: string) {
    this.membersOf = DocumentationService.getNamedMemberOf(name)!;
    if (this.membersOf)
      this.owner = docsFind(JsonDocKinds.class, DocumentationService.raw$.value, {name})[0];
  }

  @Watch(`$route.params.name`) watchMemberOfName(newValue: string, oldValue: string) {
    if (newValue !== oldValue)
      this.setMemberOfObjectTo(newValue);
  }
}
