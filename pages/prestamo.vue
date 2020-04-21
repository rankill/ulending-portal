<script lang="ts">
export default {
  fetch({ redirect }: any): Promise<void> | void {
    redirect('/lending')
  }
}
</script>
