import {BehaviorSubject} from 'rxjs';
import {Members} from '@objects/faces/members';
import {docsFind} from '@helpers/docs-find';
import {JsonDoc, JsonDocKinds} from '@objects/faces/jsdocjson';

export class Documentation {
  scopedMembers$ = new BehaviorSubject<Members|null>(null);
  raw$ = new BehaviorSubject<JsonDoc[]>([]);

  async loadDocumentation(): Promise<boolean> {

    if (this.scopedMembers$.value)
      return true;

    const documentation =
      await fetch(`./static/docs.json`)
        .then(r => r.json())
        .catch(err => {
          console.error(err);
          return {docs: ``};
        });

    if (!documentation.docs)
      return false;

    const classes = docsFind(JsonDocKinds.class, documentation.docs, {scope: 'global'});

    const members: Members = {};

    const pool = JSON.parse(JSON.stringify(documentation.docs))

    for (const doc of classes) {
      for (const member of docsFind(null, pool, {memberof: doc.name}, `tagged`)) {
        if (!members[doc.name])
          members[doc.name] = {};

        if (!members[doc.name][member.kind])
          members[doc.name][member.kind] = [];

        (member as any).tagged = true;
        members[doc.name][member.kind].push(member);
      }
    }

    this.scopedMembers$.next(members);
    this.raw$.next(documentation.docs);

    console.log(classes)

    return true;
  }

  getNamedMemberOf(name: string): {[p: string]: JsonDoc[]}|null {
    return this.scopedMembers$.value && this.scopedMembers$.value[name] || null
  }
}

export const DocumentationService = new Documentation();
